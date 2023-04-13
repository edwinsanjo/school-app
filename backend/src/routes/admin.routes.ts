import { Request, Response } from "express";
import express from "express";
import verifyAdmin from "../middlewares/verifyAdmin";

const router = express.Router();

router.get("/", verifyAdmin, (req: Request, res: Response) => {
    res.send("Authenticated as Admin")
    
})

export default router;
