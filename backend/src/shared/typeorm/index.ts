import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

//entity
import { Patients } from "@patients/entities/Patients";
import { Schedules } from "src/schedules/entities/Schedules";

//migrations
import { CreatePatientTable1706109191866 } from "./migrations/1706109191866-CreatePatientTable";
import { Schedules1706727098270 } from "./migrations/1706727098270-Schedules";
import { AddColumnPatientIdToSchedulesTable1706728381661 } from "./migrations/1706728381661-AddColumnPatientIdToSchedulesTable";

export const PostgresDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT, 10), // Converta para inteiro se necessário
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: [Patients, Schedules],
   migrations: [
      CreatePatientTable1706109191866,
      Schedules1706727098270,
      AddColumnPatientIdToSchedulesTable1706728381661,
   ],
});
