import { Request, Response } from "express";
import express from "express";
import studentModel from "../models/students.model";
import adminModel from "../models/admin.model";
import emailRegex from "../functions/emailRegex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyUser from "../middlewares/verifyStudent";
import { log } from "console";

type user = {
  _id: string;
  email: string;
  name: string;
  password: string;
  secret: string;
  user: string;
  class?: number;
  section?: string;
  teacher?: object;
  avatar: string;
};
let nullUser: user = {
  _id: "",
  email: "",
  name: "",
  password: "",
  secret: "",
  user: "",
  class: 0,
  section: "",
  teacher: {},
  avatar: "",
};

const router = express.Router();

router.get("/getuserdata", verifyUser, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    console.log({ error });

    res
      .status(500)
      .json({ error: "Internal Server Error. Please Try again later." });
  }
});


router.post("/email", async (req: Request, res: Response) => {
  if (!req.body) return res.status(400).json({ error: "Data not provided." });
  let email = req.body.email;
  if (emailRegex(email) == false)
    return res.status(400).json({ error: "Invalid email." });
  try {
    const user: user =
      (await studentModel.findOne({ email })) ||
      (await adminModel.findOne({ email })) ||
      nullUser;
    if (user === nullUser)
      return res.status(400).json({ error: "No User Found" });
    if (user.password == "") {
      let jwtToke = jwt.sign({ email }, "thisisasecretlogin");
      res.json({ type: "secret", token: jwtToke });
    } else {
      let jwtToken = jwt.sign({ email }, "thisisapasswordlogin");
      res.json({ type: "password", token: jwtToken });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Internal Server error please try again later" });
  }
});

router.post("/password", async (req: Request, res: Response) => {
  if (!req.body.token || !req.body.password)
    return res.status(400).json({ error: "Missing some Data" });

  let { token, password } = req.body;
  let decoded: any = jwt.verify(token, "thisisapasswordlogin");
  if (!decoded || !decoded.email)
    return res
      .status(500)
      .json({ error: "something went wrong please refresh the window" });
  let email = decoded.email;

  try {
    const user: user =
      (await studentModel.findOne({ email })) ||
      (await adminModel.findOne({ email })) ||
      nullUser;

    if (user === nullUser)
      return res.status(400).json({ error: "User Not Found." });
    if (!user.password)
      return res.status(500).json({ error: "refresh your page" });
    try {
      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck)
        return res.status(400).json({ error: "Wrong Password" });

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
            avatar: user.avatar,
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
            user: user.user,
            teacher: user.teacher,
            avatar: user.avatar,
          },
        };
      }

      if (!payload)
        return res.status(500).json({
          error: "Internal server error. Please try again later.1",
        });

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.json({ token: token, user: payload.user });
    } catch (error) {
      return res.status(500).json({
        error: `Internal server error. Please ty again later.2`,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error. Please ty again later.3" });
  }
});
router.post("/secret", async (req: Request, res: Response) => {
  if (!req.body.token || !req.body.secret)
    return res.status(400).json({ error: "Missing some Data" });

  let { token, secret } = req.body;
  try {
    let decoded: any = jwt.verify(token, "thisisasecretlogin");
    if (!decoded || !decoded.email)
      return res
        .status(500)
        .json({ error: "somre error occured please refresh the window" });
    let email = decoded.email;
    let user: user =
      (await studentModel.findOne({ email })) ||
      (await adminModel.findOne({ email })) ||
      nullUser;
    if (user === nullUser)
      return res.status(500).json({ error: "user not found" });
    if (user.password === "") {
      if (user.secret != secret)
        return res.status(500).json({ error: "Wrong secret" });
      let newJwt = jwt.sign({ email, user: user.user }, "secretverified");
      res.json({ type: "newpassword", token: newJwt });
    }
  } catch (e) {
    res.status(500).json({ error: "Some error occured please try again later" });
}
});
router.post("/setpassword", async (req: Request, res: Response) => {
  if (!req.body.token || !req.body.password)
    return res.status(500).json({ error: "Missing some data" });
  let { token, password } = req.body;
  try {
    let jwtToken: any = jwt.verify(token, "secretverified");
    if (!jwtToken.email || !jwtToken.user)
      return res.status(500).json({ error: "please reload the window" });
    let { email, user } = jwtToken;
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let payload;
    if (user === "student") {
      let user = await studentModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
      if (!user)
        return res
          .status(500)
          .json({ error: "some error occured please try again later." });
      if (user.user === "student") {
        payload = {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            class: user.class,
            section: user.section,
            secret: user.secret,
            avatar: user.avatar,
          },
        };
      }
      console.log(user + "student");
    } else if (user === "admin" || "teacher") {
      let user = await adminModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
      if (!user)
        return res
          .status(500)
          .json({ error: "some error occured please try again later" });
      if (user.user === "teacher" || "admin") {
        payload = {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            secret: user.secret,
            user: user.user,
            teacher: user.teacher,
            avatar: user.avatar,
          },
        };
      }
    } else
      return res
        .status(500)
        .json({ error: "some error ocuured please try again later" });
    if (!payload)
      return res.status(500).json({
        error: "Internal server error. Please try again later.1",
      });

    let finalToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.json({ token: finalToken, user: payload.user });
  } catch (e) {
    return res
      .status(500)
      .json({ error: `some error occured please try again later. ${e}` });
  }
});

export default router;
