import { MakeAppointmentController } from "@schedules/usesCases/MakeAppointment/MakeAppointmentController";
//celebrete
import { Segments, celebrate, Joi } from "celebrate";
import { Router } from "express";
import { verifyToken } from "src/helpers/verify-token";
const schedulesRouter = Router();
import { container } from "tsyringe";
//controllers
const makeAppointmentController = container.resolve(MakeAppointmentController);

schedulesRouter.post(
   "/makeAppointment",
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         date: Joi.string().required(),
         hour: Joi.string().required(),
         description: Joi.string().required(),
         patientId: Joi.string().required(),
      }),
   }),
   //check if the token is present and valid middleware
   verifyToken,
   (req, res) => {
      return makeAppointmentController.handle(req, res);
   },
);

export default schedulesRouter;
