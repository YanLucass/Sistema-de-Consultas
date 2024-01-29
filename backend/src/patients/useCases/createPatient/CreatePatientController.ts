import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePatientUseCase } from "./CreatePatientUseCase";
import { createUserToken } from "src/helpers/create-user-token";

export class CreatePatientsController {
   async handle(req: Request, res: Response): Promise<Response> {
      const createPatientUseCase = container.resolve(CreatePatientUseCase);

      const { name, email, cpf, phone, password, confirmPassword } = req.body;

      const patient = await createPatientUseCase.execute({
         name,
         email,
         cpf,
         phone,
         password,
         confirmPassword,
      });

      return createUserToken(patient, req, res);
   }
}
