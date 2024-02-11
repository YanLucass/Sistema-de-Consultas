import { Patients } from "@patients/entities/Patients";
import { PostgresDataSource } from "@shared/typeorm";
import { Repository } from "typeorm";
//interface
import { IPatientsRepository, PatientsCreateDTO } from "./IPatientsRepository";

export class PatientsRepository implements IPatientsRepository {
   private patientsRepository: Repository<Patients>;

   public constructor() {
      //create repository
      this.patientsRepository = PostgresDataSource.getRepository(Patients);
   }

   //Create patient
   async createPatients(patientData: PatientsCreateDTO): Promise<Patients> {
      //the method create from typeorm create a instance from "patients"
      const patient = await this.patientsRepository.create(patientData);
      return this.patientsRepository.save(patient);
   }

   //find user by email
   async findPatientByEmail(email: string): Promise<Patients | null> {
      return this.patientsRepository.findOneBy({ email });
   }
   //find by cpf
   async findPatientByCpf(cpf: string): Promise<Patients | null> {
      return this.patientsRepository.findOneBy({ cpf });
   }

   //find by id
   async findPatientById(id: string): Promise<Patients | null> {
      return this.patientsRepository.findOneBy({ id });
   }
}
