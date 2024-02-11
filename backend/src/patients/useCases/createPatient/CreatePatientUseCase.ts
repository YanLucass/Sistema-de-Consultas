import { Patients } from "@patients/entities/Patients";
import { IPatientsRepository } from "@patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";
//bcrypt
import bcrypt from "bcrypt";

//helpers
import { validarCPF } from "src/helpers/validaCPF";
import { validEmail } from "src/helpers/validEmail";

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
      //check if email is valid
      if (!validEmail(email)) {
         throw new AppError("Escolha um email válido!", 422);
      }
      //check if email already in use
      const emailAlreadyUse = await this.patientsRepository.findPatientByEmail(email);
      if (emailAlreadyUse) {
         throw new AppError("Esse email ja existe escolha outro", 422);
      }

      //check if passwor dis valid
      const passwordRegex = /^(?=.*[a-z]).{6,}$/;
      const isValidPassword = passwordRegex.test(password);

      if (!isValidPassword) {
         throw new AppError("A senha deve ter pelo menos 6 digitos e uma letra minuscula", 422);
      }

      //check if cpf is valid
      const cpfIsValid = validarCPF(cpf);

      if (!cpfIsValid) {
         throw new AppError("Esse cpf é inválido! Insira um valido");
      }

      cpf = cpfIsValid;

      //check if cpf already in use
      const cpfAlreadyInUse = await this.patientsRepository.findPatientByCpf(cpf);
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
