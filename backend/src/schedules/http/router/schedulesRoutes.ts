import { CancelAppointmentController } from "@schedules/usesCases/CancelAppointment/CancelAppointmentController";
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
const cancelAppointmentController = container.resolve(CancelAppointmentController);

//check if the token is present and valid middleware
schedulesRouter.use(verifyToken);

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
   (req, res) => {
      return makeAppointmentController.handle(req, res);
   },
);

//get individuals patient appoitnments
schedulesRouter.get("/patientAppointments", (req, res) => {
   return patientsAppointmentsController.handle(req, res);
});

//cancel patient appointment
schedulesRouter.delete(
   "/cancelAppointment/:id",
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         id: Joi.string().uuid().required(),
      }),
   }),
   (req, res) => {
      return cancelAppointmentController.handle(req, res);
   },
);

export default schedulesRouter;
