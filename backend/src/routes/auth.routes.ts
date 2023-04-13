import { Request, Response } from "express";
import express from "express";
import userModel from "../models/user.model";
import emailRegex from "../functions/emailRegex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyUser from "../middlewares/verifyUser";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).json({ error: "Missing some Data" });
  let { name, email, password } = req.body;
  if (emailRegex(email) == false)
    return res.status(400).json({ error: "Invalid email." });
  if (name.length < 3)
    return res
      .status(400)
      .json({ error: "name should minimum be a length of 3 charecters" });
  try {
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exist" });
    user = new userModel({
      email,
      name,
      password,
    });
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      let payload = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          admin: user.admin,
        },
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      res.json({ token: token, user: payload.user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error. Please ty again later." });
    }
  } catch {
    return res
      .status(500)
      .json({ error: "Internal server error. Please ty again later." });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ error: "Missing some Data" });
  let { email, password } = req.body;
  if (emailRegex(email) == false)
    return res.status(400).json({ error: "Invalid email." });
  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User Not Found." });
    try {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        return res.status(400).json({ error: "User Not Found" });
      let payload = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          admin: user.admin,
        },
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      res.json({ token: token, user: payload.user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error. Please ty again later." });
    }
  } catch {
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
