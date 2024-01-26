import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

//criar token
export const createUserToken = async (user, req: Request, res: Response): Promise<Response> => {
   const token = jwt.sign(
      {
         name: user.name,
         id: user.id,
      },
      process.env.SECRET,
   );

   return res.status(200).json({
      message: "Você está autenticado",
      token: token,
      userId: user.id,
   });
};
