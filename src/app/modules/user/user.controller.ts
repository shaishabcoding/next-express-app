import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserValidation } from "./user.validation";

const createUser: RequestHandler = async (req, res, next) => {
  const { body } = req;

  if (body.dateOfBirth) body.dateOfBirth = new Date(body.dateOfBirth);

  const {
    success,
    data: user,
    error,
  } = UserValidation.userValidationSchema.safeParse(req.body);

  if (!success) {
    next(error);
    return;
  }

  try {
    const result = await UserServices.createUserIntoDB(user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User create successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUserFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users are retrieved successfully!",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
};
