import express, { Request, Response } from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello shaishab!");
});

export default app;
