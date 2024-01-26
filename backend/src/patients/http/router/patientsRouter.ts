import { Router } from "express";
import { patientController } from "@patients/useCases/createPatient";
import { Segments, celebrate, Joi } from "celebrate";

const patientsRouter = Router();

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
      return patientController.handle(req, res);
   },
);

export default patientsRouter;
