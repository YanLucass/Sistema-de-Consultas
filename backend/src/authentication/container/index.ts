import { PatientsRepository } from "@patients/repositories/PatientsRepository";
import { IPatientsRepository } from "@patients/repositories/IPatientsRepository";
import { LoginController } from "../useCase/LoginController";

import { container } from "tsyringe";

container.registerSingleton<IPatientsRepository>("PatientsRepository", PatientsRepository);
container.registerSingleton("LoginController", LoginController);
