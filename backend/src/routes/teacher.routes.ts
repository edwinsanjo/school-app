import { Request, Response } from "express";
import express from "express";
import verifyTeacher from "../middlewares/verifyTeacher";
import verifyAdmin from "../middlewares/verifyAdmin";

const router = express.Router();

router.get("/", [verifyTeacher, verifyAdmin], (req: Request, res: Response) => {
  res.send("Authenticated as Admin");
});
router.post(
  "/addstudent",
  [verifyTeacher, verifyAdmin],
    (req: Request, res: Response) => {
      
  }
);

export default router;
