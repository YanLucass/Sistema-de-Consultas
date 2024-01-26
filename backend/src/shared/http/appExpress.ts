import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import router from "./routes/index";

import { errors } from "celebrate";
import { AppError } from "@shared/errors/AppError";

const app = express();
app.use(express.json());
app.use(router);
//caso tenha algum erro na rota o middleware do celebrate erros entra em ação.
app.use(errors());
//lidar com erros da classe AppError
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
   //caso o erro seja uma instancia de AppError vamos retornar um objeto com status e mesagem do erro;
   if (error instanceof AppError) {
      return res.status(error.statusCode).json({
         status: "error",
         message: error.message,
      });
   }

   //erros da aplicação ex: erros interno do servidor (500)
   console.log(error);
   return res.status(500).json({
      status: "error",
      message: "Internal server error",
   });
});
export { app };
