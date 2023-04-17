import { Request, Response } from "express";
import express from "express";
import studentModel from "../models/students.model";
import adminModel from "../models/admin.model";
import emailRegex from "../functions/emailRegex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyUser from "../middlewares/verifyStudent";

type user = {
  _id?: string;
  email?: string;
  name: string;
  password?: string;
  secret?: string;
  user?: string;
  class?: number;
  section?: string;
  teacher?: object;
};

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ error: "Missing some Data" });

  let { email, password } = req.body;

  if (emailRegex(email) == false)
    return res.status(400).json({ error: "Invalid email." });

  try {
    const user: user = (await studentModel.findOne({ email })) ||
      (await adminModel.findOne({ email })) || { name: "null" };

    if (user.name === null)
      return res.status(400).json({ error: "User Not Found." });

    console.log(user);
    if (!user.password)
      return res.status(400).json({ error: "User Not Found" });
    try {
      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck)
        return res.status(400).json({ error: "User Not Found" });

      let payload;
      if (user.user === "student") {
        payload = {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            class: user.class,
            section: user.section,
            secret: user.secret,
          },
        };
      }
      if (user.user === "teacher" || "admin") {
        payload = {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            secret: user.secret,
            teacher: user.teacher,
          },
        };
      }

      if (!payload)
        return res
          .status(500)
          .json({
            error: "Internal server error. Please try again later. payload",
          });

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.json({ token: token, user: payload.user });
    } catch (error) {
      return res
        .status(500)
        .json({
          error: `Internal server error. Please ty again later. ${error} error logged`,
        });
    }
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ error: "Internal server error. Please ty again later." });
  }
});

router.get("/getuserdata", verifyUser, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    res.status(500).send("Internal Server Error. Please Try again later.");
  }
});

export default router;
