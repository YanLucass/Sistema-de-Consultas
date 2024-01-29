import "reflect-metadata";
import { app } from "./appExpress";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger.json";
import "dotenv/config";

//documentation url
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//connect to bd
import { PostgresDataSource } from "@shared/typeorm";

const port = process.env.PORT || 5000;

PostgresDataSource.initialize().then(() => {
   app.listen(port, () => {
      console.log(`Rodando na ${port}`);
   });
});
