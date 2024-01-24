import { app } from "./appExpress";
import "reflect-metadata";
import "dotenv/config";

//conectar o bd qnd o app iniciar
import { PostgresDataSource } from "@shared/typeorm";

const port = process.env.PORT || 5000;

PostgresDataSource.initialize().then(() => {
   app.listen(port, () => {
      console.log(`Rodando na ${port}`);
   });
});
