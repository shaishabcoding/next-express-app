import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/", UserControllers.getAllUser);
router.get("/:email", UserControllers.getAUser);
router.post(
  "/create-user",
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
