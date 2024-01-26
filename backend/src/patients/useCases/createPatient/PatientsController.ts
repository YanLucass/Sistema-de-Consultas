import { Request, Response } from "express";
import { CreatePatientUseCase } from "./CreatePatientUseCase";
import { createUserToken } from "src/helpers/create-user-token";

export class PatientsController {
   private createPatientUseCase: CreatePatientUseCase;

   constructor(createPatientUseCase: CreatePatientUseCase) {
      this.createPatientUseCase = createPatientUseCase;
   }

   async handle(req: Request, res: Response): Promise<Response> {
      const { name, email, cpf, phone, password, confirmPassword } = req.body;

      const patient = await this.createPatientUseCase.execute({
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
