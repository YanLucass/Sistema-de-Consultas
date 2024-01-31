import express from "express";
const router = express.Router();

//import routes
import patientsRouter from "@patients/http/router/patientsRouter";
import loginRouter from "src/authentication/http/router/loginRouter";

router.use("/patients", patientsRouter);
router.use("/login", loginRouter);
export default router;
