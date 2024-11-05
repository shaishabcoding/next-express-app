import express, { Request, RequestHandler, Response } from "express";
import { AuthController } from "./Auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./Auth.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);
router.patch(
  "/change-password",
  auth("USER", "ADMIN"),
  validateRequest(AuthValidation.passwordChangeValidationSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
