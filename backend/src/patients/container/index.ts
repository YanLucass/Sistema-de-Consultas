import { IPatientsRepository } from "@patients/repositories/IPatientsRepository";
import { PatientsRepository } from "@patients/repositories/PatientsRepository";

import { CreatePatientsController } from "@patients/useCases/createPatient/CreatePatientController";
import { container } from "tsyringe";

container.registerSingleton<IPatientsRepository>("PatientsRepository", PatientsRepository);
container.registerSingleton("CreatePatientsController", CreatePatientsController);
