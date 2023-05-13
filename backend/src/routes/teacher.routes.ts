import { Request, Response } from "express";
import express from "express";
import verifyTeacher from "../middlewares/verifyTeacher";
import verifyAdmin from "../middlewares/verifyAdmin";
import studentsModel from "../models/students.model";
import emailRegex from "../functions/emailRegex";

const router = express.Router();

router.get("/", verifyTeacher, (req: Request, res: Response) => {
  res.send("Authenticated as Admin");
});
router.get(
  "/getstudents",
  verifyTeacher,
  async (req: Request, res: Response) => {
    try {
      let studs = await studentsModel.find();
      res.json(studs);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server errror. Please try again later" });
    }
  }
);
router.post(
  "/getstudents",
  verifyTeacher,
  async (req: Request, res: Response) => {
    try {
      if (!req.body) return res.send(await studentsModel.find());
      if (req.body._id) {
        try {
          res.send(await studentsModel.findById(req.body._id));
        } catch (error) {
          res.status(500).json({ error: "some error occured" });
        }
      }
      if (req.body.classNo) {
        let data = await studentsModel.find({ classNo: req.body.classNo });
        return res.send(data);
      }
      if (req.body.classNo && req.body.section) {
        let data = await studentsModel.find({
          classNo: req.body.classNo,
          section: req.body.section,
        });
        return res.send(data);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "some error occured. please try again later" });
    }
  }
);
router.post(
  "/addstudent",
  verifyTeacher,
  async (req: Request, res: Response) => {
    if (
      !req.body.email ||
      !req.body.name ||
      !req.body.classNo ||
      !req.body.section
    )
      return res.status(500).json({ error: "data not provided" });
    const { email, name, classNo, section } = req.body;
    if (emailRegex(email) == false)
      return res.status(400).json({ error: "Invalid email." });
    try {
      await studentsModel.create({ email, name, classNo, section });
    } catch (error) {
      return res.status(500).json({ error: "Some error occured" });
    }
  }
);

router.post("/editStudent", verifyTeacher, (req:Request, res:Response) => {
   
})

export default router;
