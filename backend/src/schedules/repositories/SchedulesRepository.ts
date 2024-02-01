import { Schedules } from "../entities/Schedules";
import { ISchedulesRepository, ScheduleDTO } from "./ISchedulesRepository";

export class SchedulesRepository implements ISchedulesRepository {
   async saveAppointment({ date, hour, description, patientId }: ScheduleDTO): Promise<Schedules> {}
}
