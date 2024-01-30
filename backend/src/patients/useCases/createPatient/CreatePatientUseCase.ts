import { Patients } from "@patients/entities/Patients";
import { IPatientsRepository } from "@patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";
//bcrypt
import bcrypt from "bcrypt";

//helpers
import { validarCPF } from "src/helpers/validaCPF";

type createPatientsDTO = {
   name: string;
   email: string;
   cpf: string;
   phone: string;
   password: string;
   confirmPassword: string;
};

@injectable()
export class CreatePatientUseCase {
   constructor(@inject("PatientsRepository") private patientsRepository: IPatientsRepository) {}

   async execute({
      name,
      email,
      cpf,
      phone,
      password,
      confirmPassword,
   }: createPatientsDTO): Promise<Patients> {
      //check if email already in use
      const emailAlreadyUse = await this.patientsRepository.findUserByEmail(email);
      if (emailAlreadyUse) {
         throw new AppError("Esse email ja existe escolha outro", 422);
      }

      //check if cpf is valid
      const cpfIsValid = validarCPF(cpf);

      if (!cpfIsValid) {
         throw new AppError("Esse cpf é inválido! Insira um valido");
      }

      cpf = cpfIsValid;

      //check if cpf already in use
      const cpfAlreadyInUse = await this.patientsRepository.findUserByCpf(cpf);
      if (cpfAlreadyInUse) {
         throw new AppError("Esse cpf já está cadastrado no sistema", 422);
      }

      //check if password matchs with confirmPassword
      if (password != confirmPassword) {
         throw new AppError("As senhas devem ser iguais", 422);
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const patient = {
         name,
         email,
         phone,
         cpf,
         password: hashedPassword,
      };

      return this.patientsRepository.createPatients(patient);
   }
}
