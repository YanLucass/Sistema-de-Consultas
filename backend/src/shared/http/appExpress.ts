import express from "express";
import router from "./routes/index";

import { errors } from "celebrate";

const app = express();
app.use(express.json());
app.use(router);
//caso tenha algum erro na rota o middleware do celebrate erros entra em ação.
app.use(errors);

export { app };
