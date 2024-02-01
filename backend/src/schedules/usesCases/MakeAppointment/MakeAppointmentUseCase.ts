import { ISchedulesRepository, ScheduleDTO } from "src/schedules/repositories/ISchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class MakeAppointmentUseCase {
   constructor(@inject("SchedulesRepository") private schedulesRepository: ISchedulesRepository) {}
   async execute({ date, hour, description, patientId }: ScheduleDTO) {}
}
