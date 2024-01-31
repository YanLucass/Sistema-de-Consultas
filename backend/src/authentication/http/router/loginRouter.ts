import { Segments, celebrate, Joi } from "celebrate";
import express from "express";
import { LoginController } from "src/authentication/useCase/LoginController";
const routerLogin = express.Router();

//cotainer
import { container } from "tsyringe";
const loginController = container.resolve(LoginController);

routerLogin.post(
   "/",
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         email: Joi.string().required(),
         password: Joi.string().required(),
      }),
   }),
   (req, res) => {
      return loginController.handle(req, res);
   },
);

export default routerLogin;
