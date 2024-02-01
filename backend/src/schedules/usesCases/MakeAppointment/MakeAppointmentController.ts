import { Request, Response } from "express";
import { container } from "tsyringe";
import { MakeAppointmentUseCase } from "./MakeAppointmentUseCase";
import getToken from "src/helpers/get-token";

export class MakeAppointmentController {
   async handle(req: Request, res: Response) {
      const makeAppointmentUseCase = container.resolve(MakeAppointmentUseCase);

      const { date, hour, description } = req.body;
      makeAppointmentUseCase.execute({ date, hour, description });
   }
}
