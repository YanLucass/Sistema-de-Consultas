import { PatientsRepository } from "@patients/repositories/PatientsRepository";
import jwt from "jsonwebtoken";
import { container } from "tsyringe";

const patientsRepository = container.resolve(PatientsRepository);
export const getUserByToken = async function (res, token) {
   if (!token) {
      return res.status(401).json({ message: "Acesso negado" });
   }

   const decodedUser = jwt.verify(token, process.env.SECRET);
   const user = await patientsRepository.findPatientById(decodedUser.id);
   return user;
};
