import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("patients")
export class Patients {
   @PrimaryColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   phone: string;

   @Column()
   cpf: string;

   @Column()
   password: string;

   @CreateDateColumn()
   created_at: Date;

   constructor(name: string, email: string, phone: string, cpf: string, password: string) {
      if (!this.id) {
         this.id = uuidv4();
      }
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.cpf = cpf;
      this.password = password;
   }
}
