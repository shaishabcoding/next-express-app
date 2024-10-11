import express, { Request, RequestHandler, Response } from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserControllers.createUser);

export const UserRoutes = router;
