import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as Express from "express";
import * as Cors from "cors";
import * as BodyParser from "body-parser";
import userRouter from "./routes/userRoutes";
import tmdcMsnRouter from "./routes/tmdcMsnRoutes";
import linesRefRouter from "./routes/lineRefRoutes";
createConnection()
  .then(async (connection) => {
    const app = Express();
    app.use(Cors());
    app.use(BodyParser.json({ limit: "5mb" }));
    app.use(BodyParser.urlencoded({ limit: "5mb", extended: true }));
    app.use("/api", userRouter);
    app.use("/api", tmdcMsnRouter);
    app.use("/api", linesRefRouter);

    app.listen(8080, () => console.log("App is running at port 8080"));
  })
  .catch((error) => console.log(error));
