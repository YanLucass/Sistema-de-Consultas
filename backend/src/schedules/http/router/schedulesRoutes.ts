import { MakeAppointmentController } from "@schedules/usesCases/MakeAppointment/MakeAppointmentController";
import { PatientsAppointmentsController } from "@schedules/usesCases/PatientsAppointment/PatientsAppointmentsController";
//celebrete
import { Segments, celebrate, Joi } from "celebrate";
import { Router } from "express";
import { verifyToken } from "src/helpers/verify-token";
const schedulesRouter = Router();
import { container } from "tsyringe";
//controllers
const makeAppointmentController = container.resolve(MakeAppointmentController);
const patientsAppointmentsController = container.resolve(PatientsAppointmentsController);

//make a appointment router
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

//get individuals patient appoitnments
schedulesRouter.get("/patientAppointments", verifyToken, (req, res) => {
   return patientsAppointmentsController.handle(req, res);
});

export default schedulesRouter;
