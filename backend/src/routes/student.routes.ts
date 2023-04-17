import { Request, Response } from "express";
import express from "express";
import verifyStudent from "../middlewares/verifyStudent";

const router = express.Router();

router.get("/", verifyStudent, (req: Request, res: Response) => {
  res.send("Authenticated as Student");
});

export default router;
