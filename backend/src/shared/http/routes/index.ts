import express from "express";
const router = express.Router();

//import routes
import patientsRouter from "@patients/http/router/patientsRouter";

router.use("/patients", patientsRouter);

export default router;
