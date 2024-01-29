import { Router } from "express";
import { Segments, celebrate, Joi } from "celebrate";
import { container } from "tsyringe";
import { CreatePatientsController } from "@patients/useCases/createPatient/CreatePatientController";

const patientsRouter = Router();

const createPatienteController = container.resolve(CreatePatientsController);

patientsRouter.post(
   "/",
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         name: Joi.string().required(),
         email: Joi.string().required(),
         cpf: Joi.string().required(),
         phone: Joi.string().required(),
         password: Joi.string().required(),
         confirmPassword: Joi.string().required(),
      }),
   }),
   (req, res) => {
      return createPatienteController.handle(req, res);
   },
);

export default patientsRouter;
