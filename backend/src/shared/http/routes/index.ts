import express from "express";
const router = express.Router();

//import routes
import patientsRouter from "@patients/http/router/patientsRouter";
import loginRouter from "src/authentication/http/router/loginRouter";
import schedulesRouter from "@schedules/http/router/schedulesRoutes";

router.use("/patients", patientsRouter);
router.use("/login", loginRouter);
//scheduleRoutes
router.use("/schedules", schedulesRouter);

export default router;
