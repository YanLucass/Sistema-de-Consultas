import { PatientsRepository } from "@patients/repositories/PatientsRepository";
import { PatientsController } from "./PatientsController";
import { CreatePatientUseCase } from "./CreatePatientUseCase";

const patientsRepository = PatientsRepository.getInstance();
const createPatientUseCase = new CreatePatientUseCase(patientsRepository);
export const patientController = new PatientsController(createPatientUseCase);
