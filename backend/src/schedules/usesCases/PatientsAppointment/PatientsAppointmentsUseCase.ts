import { inject, injectable } from "tsyringe";
import { ISchedulesRepository } from "@schedules/repositories/ISchedulesRepository";

@injectable()
export class PatientsAppointmentUseCase {
   constructor(@inject("SchedulesRepository") private scheudlesRepository: ISchedulesRepository) {}
   async execute(id: string) {
      return this.scheudlesRepository.getAllPatientsAppointments(id);
   }
}
