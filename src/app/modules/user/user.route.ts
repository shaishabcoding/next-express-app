import express, { Request, RequestHandler, Response } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(["ADMIN"]), UserControllers.getAllUser);
router.get("/:id", UserControllers.getAUser);
router.post(
  "/create-user",
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
