import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
//controllers to router
import { MakeAppointmentController } from "@schedules/usesCases/MakeAppointment/MakeAppointmentController";
import { container } from "tsyringe";

container.registerSingleton<ISchedulesRepository>("SchedulesRepository", SchedulesRepository);
container.registerSingleton("MakeAppointmentController", MakeAppointmentController);
