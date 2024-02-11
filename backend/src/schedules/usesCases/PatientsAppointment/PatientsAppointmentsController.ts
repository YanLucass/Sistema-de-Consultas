import { Request, Response } from "express";
import getToken from "src/helpers/get-token";
import { getUserByToken } from "src/helpers/get-user-by-token";
import { container } from "tsyringe";
import { PatientsAppointmentUseCase } from "./PatientsAppointmentsUseCase";

export class PatientsAppointmentsController {
   async handle(req: Request, res: Response) {
      const patientAppointmentUseCase = container.resolve(PatientsAppointmentUseCase);
      const token = await getToken(req);
      //get user to get id
      const user = await getUserByToken(res, token);

      try {
         const patientsAppointments = await patientAppointmentUseCase.execute(user.id);
         return res.status(200).json({ message: "Todas as consultas", patientsAppointments });
      } catch (error) {
         console.log("Erro ao retornar todas as consults do paciente", error);
      }
   }
}
