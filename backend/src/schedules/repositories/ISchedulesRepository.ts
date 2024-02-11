import { Patients } from "@patients/entities/Patients";
import { Schedules } from "../entities/Schedules";

//define schedule schema to save in bd
export type ScheduleDTO = {
   date: string;
   hour: string;
   description: string;
   patient: Patients;
};
export interface ISchedulesRepository {
   saveAppointment(schedule: ScheduleDTO): Promise<Schedules>;
   getAppointmentWithDateAndHour(date: string, hour: string): Promise<Schedules>;
   getAllPatientsAppointments(id: string): Promise<Schedules[] | null>;
}
