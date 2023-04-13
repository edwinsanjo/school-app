import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, data: any) => {
      if (err) return res.status(403).json({ error: "Forbidden" });
      if (!data) return res.status(403).json({ error: "Forbidden" });
      if (data.user.admin === true) {
        req.user = data.user;
        next();
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export default verifyAdmin;
