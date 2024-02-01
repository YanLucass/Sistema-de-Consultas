import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("schedules")
export class Schedules {
   @PrimaryColumn("uuid")
   id: string;

   @Column()
   date: string;

   @Column()
   hour: string;

   @Column()
   description: string;

   @Column()
   patientId: string;

   constructor(date: string, hour: string, description: string) {
      //to generate id
      if (!this.id) {
         this.id = uuidv4();
      }
      this.date = date;
      this.hour = hour;
      this.description = description;
   }
}
