import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelAppointmentUseCase } from "./CancelAppointmentUseCase";

export class CancelAppointmentController {
   async handle(req: Request, res: Response): Promise<Response> {
      //get CancelAppointmentUseCase
      const cancelAppointmentUseCase = container.resolve(CancelAppointmentUseCase);
      const { id } = req.params;
      await cancelAppointmentUseCase.execute(id);
      return res.status(200).json({ message: "Consulta desmarcada com sucesso" });
   }
}
