import express, { Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello king!");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
