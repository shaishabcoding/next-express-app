import express, { Request, RequestHandler, Response } from "express";

const router = express.Router();

router.post("/create-user", async (req: Request, res: Response) => {
  const user = req.body;
});
