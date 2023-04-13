import { Request, Response } from "express";
import express from "express";
import verifyUser from "../middlewares/verifyUser";

const router = express.Router();

router.get("/", verifyUser, (req: Request, res: Response) => {
  res.send("Authenticated as User");
});

export default router;
