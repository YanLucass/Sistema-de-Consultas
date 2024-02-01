import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules")
export class Schedules {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   date: string;

   @Column()
   hour: string;

   @Column()
   description: string;

   @Column()
   patientId: number;

   constructor(date: string, hour: string, description: string) {
      this.date = date;
      this.hour = hour;
      this.description = description;
   }
}
