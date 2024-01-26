import { Patients } from "@patients/entities/Patients";
import { PostgresDataSource } from "@shared/typeorm";
import { Repository } from "typeorm";

type PatientsCreateDTO = {
   name: string;
   email: string;
   phone: string;
   cpf: string;
   password: string;
};

export class PatientsRepository {
   private patientsRepository: Repository<Patients>;

   private static INSTANCE: PatientsRepository;

   private constructor() {
      //criar repositorio, apenas essa classe pode fazer isso.
      this.patientsRepository = PostgresDataSource.getRepository(Patients);
   }

   //garantir instancia unica
   public static getInstance(): PatientsRepository {
      if (!this.INSTANCE) {
         this.INSTANCE = new PatientsRepository();
      }
      return this.INSTANCE;
   }

   //Create patient
   async createPatient(patientData: PatientsCreateDTO): Promise<Patients> {
      //the method create from typeorm create a instance from "patients"
      const patient = await this.patientsRepository.create(patientData);
      return this.patientsRepository.save(patient);
   }

   //find user by email
   async findUserByEmail(email: string): Promise<Patients | undefined> {
      return this.patientsRepository.findOneBy({ email });
   }
   //find by cpf
   async findUserByCpf(cpf: string): Promise<Patients> {
      return this.patientsRepository.findOneBy({ cpf });
   }
}
