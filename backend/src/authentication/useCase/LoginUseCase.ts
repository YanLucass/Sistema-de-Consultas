import { IPatientsRepository } from "@patients/repositories/IPatientsRepository";
//error class
import { AppError } from "@shared/errors/AppError";
//tsyringe
import { inject, injectable } from "tsyringe";

//helpers
import { validEmail } from "src/helpers/validEmail";

//bcrypt
import bcrypt from "bcrypt";

//login dto
type loginDTO = {
   email: string;
   password: string;
};

@injectable()
export class LoginUseCase {
   constructor(@inject("PatientsRepository") private patientsRepository: IPatientsRepository) {}
   async execute({ email, password }: loginDTO) {
      //check if valid email
      if (!validEmail(email)) {
         throw new AppError("Insira um email válido", 422);
      }
      //check if user with email exits
      const user = await this.patientsRepository.findUserByEmail(email);
      if (!user) {
         throw new AppError("Não existe usuario com esse email", 422);
      }

      //check if password matchs with password registered
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
         throw new AppError("Senha incorreta!", 401);
      }

      return user;
   }
}
