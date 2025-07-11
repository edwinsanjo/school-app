import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";

let app: Express = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())
  .use(logger("dev"));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};
mongoose.connect(process.env.MONGO_URI, options);
mongoose.connection
  .on("error", console.error.bind(console, "connection error: "))
  .once("open", () => console.log("Connected successfully"));

import AuthRoutes from "./routes/auth.routes";
import StudentRoutes from "./routes/student.routes";
import TeacherRoutes from "./routes/teacher.routes";
import AdminRoutes from "./routes/admin.routes";

app
  .use("/auth", AuthRoutes)
  .use("/student", StudentRoutes)
  .use("/teacher", TeacherRoutes)
  .use("/admin", AdminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Working! Ping Pong");
});

app.listen(process.env.PORT, () =>
  console.log(`Server Running On: http://localhost:${process.env.PORT}`)
);
