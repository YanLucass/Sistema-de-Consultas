import { IPatientsRepository } from "@patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";
import { checkIfDateIsRetroactive } from "src/helpers/checkIfDateIsReatroative";
import { ISchedulesRepository } from "src/schedules/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

//define dto to make an appointment with patientID
type ServiceMakeAppointmentDTO = {
   date: string;
   hour: string;
   description: string;
   patientId: string;
};
@injectable()
export class MakeAppointmentUseCase {
   constructor(
      //get repositories
      @inject("SchedulesRepository") private schedulesRepository: ISchedulesRepository,
      @inject("PatientsRepository") private patientsRepository: IPatientsRepository,
   ) {}

   async execute({ date, hour, description, patientId }: ServiceMakeAppointmentDTO) {
      //validations

      //check if date is retroactive
      if (checkIfDateIsRetroactive(date, hour)) {
         throw new AppError("Não é possível marcar consultas no passado", 422);
      }

      //check if an appointment has already been scheduled
      const appointmentAlreadyExists = await this.schedulesRepository.getAppointmentWithDateAndHour(
         date,
         hour,
      );

      if (appointmentAlreadyExists) {
         throw new AppError("Já existe uma consulta para esse dia / horário, tente outro.", 422);
      }

      //pick up the patient for the schedules enitity
      const patient = await this.patientsRepository.findPatientById(patientId);

      //create obj schedule to create a new.
      const schedule = {
         date,
         hour,
         description,
         patient,
      };

      return this.schedulesRepository.saveAppointment(schedule);
   }
}
