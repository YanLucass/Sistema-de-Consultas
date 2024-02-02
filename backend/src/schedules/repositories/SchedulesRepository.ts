import { Repository } from "typeorm";
import { Schedules } from "../entities/Schedules";
import { ISchedulesRepository, ScheduleDTO } from "./ISchedulesRepository";
import { PostgresDataSource } from "@shared/typeorm";

export class SchedulesRepository implements ISchedulesRepository {
   private scheduleRepository: Repository<Schedules>;
   constructor() {
      this.scheduleRepository = PostgresDataSource.getRepository(Schedules);
   }

   //save appointment method
   async saveAppointment(schedule: ScheduleDTO): Promise<Schedules> {
      const newSchedule = await this.scheduleRepository.create(schedule);
      return this.scheduleRepository.save(newSchedule);
   }
   //return appointment with a date and hour
   async getAppointmentWithDateAndHour(date: string, hour: string): Promise<Schedules> {
      return this.scheduleRepository.findOneBy({ date, hour });
   }

   //find all appointments of patients
   async getAllPatientsAppointments(id: string): Promise<Schedules[] | null> {
      return this.scheduleRepository.find({ where: { patientId: id } });
   }
}
