import express, { Request, RequestHandler, Response } from "express";
import { AuthController } from "./Auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./Auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);

export const AuthRoutes = router;
