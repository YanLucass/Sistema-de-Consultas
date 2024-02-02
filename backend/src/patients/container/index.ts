import { IPatientsRepository } from "@patients/repositories/IPatientsRepository";
import { PatientsRepository } from "@patients/repositories/PatientsRepository";
import { GetCurrentUserController } from "@patients/useCases/GetCurrentUserController";

import { CreatePatientsController } from "@patients/useCases/createPatient/CreatePatientController";
import { container } from "tsyringe";

container.registerSingleton<IPatientsRepository>("PatientsRepository", PatientsRepository);
container.registerSingleton("CreatePatientsController", CreatePatientsController);
container.registerSingleton("GetCurrentUserController", GetCurrentUserController);
