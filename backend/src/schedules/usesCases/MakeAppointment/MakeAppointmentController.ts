import { Request, Response } from "express";
import { container } from "tsyringe";
import { MakeAppointmentUseCase } from "./MakeAppointmentUseCase";
import getToken from "src/helpers/get-token";
import { getUserByToken } from "src/helpers/get-user-by-token";

export class MakeAppointmentController {
   async handle(req: Request, res: Response) {
      const makeAppointmentUseCase = container.resolve(MakeAppointmentUseCase);
      //get token
      const token = getToken(req);
      //to get patientId from object user
      const user = await getUserByToken(res, token);

      const { date, hour, description } = req.body;

      const newSchedule = await makeAppointmentUseCase.execute({
         date,
         hour,
         description,
         patientId: user.id,
      });

      return res
         .status(200)
         .json({ message: "Novo agendamento registrado com sucesso", newSchedule });
   }
}
