import { ISchedulesRepository } from "@schedules/repositories/ISchedulesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelAppointmentUseCase {
   constructor(@inject("SchedulesRepository") private schedulesRepository: ISchedulesRepository) {}

   async execute(id: string): Promise<void> {
      const schedule = await this.schedulesRepository.findScheduleById(id);

      if (!schedule) {
         throw new AppError("Essa consulta não existe ou foi removida", 404);
      }

      await this.schedulesRepository.cancelPatientAppointment(schedule);
   }
}
