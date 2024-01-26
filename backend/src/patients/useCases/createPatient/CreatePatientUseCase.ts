import { Patients } from "@patients/entities/Patients";
import { PatientsRepository } from "@patients/repositories/PatientsRepository";
import { AppError } from "@shared/errors/AppError";

//bcrypt
import bcrypt, { genSalt, hash } from "bcrypt";

type createPatientsDTO = {
   name: string;
   email: string;
   cpf: string;
   phone: string;
   password: string;
   confirmPassword: string;
};
export class CreatePatientUseCase {
   constructor(private patientsRepository: PatientsRepository) {}

   async execute({
      name,
      email,
      cpf,
      phone,
      password,
      confirmPassword,
   }: createPatientsDTO): Promise<Patients> {
      const emailAlreadyUse = await this.patientsRepository.findUserByEmail(email);
      if (emailAlreadyUse) {
         throw new AppError("Esse email ja existe escolha outro", 422);
      }

      const cpfAlreadyInUse = await this.patientsRepository.findUserByCpf(cpf);
      if (cpfAlreadyInUse || cpf.length > 11) {
         throw new AppError("Esse cpf já está cadastrado no sistema ou não é um cpf valido", 422);
      }

      //validar cpf
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

      return this.patientsRepository.createPatient(patient);
   }
}
