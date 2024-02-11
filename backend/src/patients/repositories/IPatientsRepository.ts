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
   findPatientByEmail(email: string): Promise<Patients | null>;
   findPatientByCpf(cpf: string): Promise<Patients | null>;
   findPatientById(id: string): Promise<Patients | null>;
}
