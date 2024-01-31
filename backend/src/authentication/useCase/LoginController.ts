import { Request, Response } from "express";
import { container } from "tsyringe";
import { LoginUseCase } from "./LoginUseCase";
import { createUserToken } from "src/helpers/create-user-token";

export class LoginController {
   async handle(req: Request, res: Response): Promise<Response> {
      const { email, password } = req.body;

      const loginUseCase = container.resolve(LoginUseCase);
      const user = await loginUseCase.execute({ email, password });

      return createUserToken(user, req, res);
   }
}
