import { AppError } from "@shared/errors/AppError";
import { checkIfDateIsRetroactive } from "src/helpers/checkIfDateIsReatroative";
import { ISchedulesRepository, ScheduleDTO } from "src/schedules/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class MakeAppointmentUseCase {
   constructor(@inject("SchedulesRepository") private schedulesRepository: ISchedulesRepository) {}
   async execute({ date, hour, description, patientId }: ScheduleDTO) {
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

      //create obj schedule to create a new.
      const schedule = {
         date,
         hour,
         description,
         patientId,
      };

      return this.schedulesRepository.saveAppointment(schedule);
   }
}
