import { Schedules } from "../entities/Schedules";

//define schedule schema
export type ScheduleDTO = {
   date: string;
   hour: string;
   description: string;
   patientId: string;
};
export interface ISchedulesRepository {
   saveAppointment(schedule: ScheduleDTO): Promise<Schedules>;
   getAppointmentWithDateAndHour(date: string, hour: string): Promise<Schedules>;
}
