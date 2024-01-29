import { Patients } from "@patients/entities/Patients";

export type PatientsCreateDTO = {
   name: string;
   email: string;
   phone: string;
   cpf: string;
   password: string;
};

export interface IPatientsRepository {
   createPatients(patientData: PatientsCreateDTO): Promise<Patients>;
   findUserByEmail(email: string): Promise<Patients | null>;
   findUserByCpf(cpf: string): Promise<Patients | null>;
}
