import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, data: any) => {
      if (err && !data)
        return res
          .status(403)
          .json({ error: "Authetication error please relogin" });
      if (err) return;
      if (!data)
        return res
          .status(403)
          .json({ error: "Authetication error please relogin" });
      if (data.user.user === "student" || "teacher" || "admin") {
        req.user = data.user;
        next();
      }
    });
  } else {
    res.status(403).json({ error: "No Token" });
  }
};

export default verifyUser;
