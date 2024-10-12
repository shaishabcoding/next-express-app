import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserValidation } from "./user.validation";
import { Types } from "mongoose";
import catchAsync from "../../utils/catchAsync";

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { body } = req;

  if (body.dateOfBirth) body.dateOfBirth = new Date(body.dateOfBirth);

  const {
    success,
    data: user,
    error,
  } = UserValidation.userValidationSchema.safeParse(req.body);

  if (!success) {
    return next(error);
  }

  const result = await UserServices.createUserIntoDB(user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User create successfully!",
    data: result,
  });
});

const getAllUser: RequestHandler = catchAsync(async (_req, res) => {
  const users = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users are retrieved successfully!",
    data: users,
  });
});

const getAUser: RequestHandler = catchAsync(async (req, res) => {
  const id = new Types.ObjectId(req.params.id);

  const users = await UserServices.getAUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully!",
    data: users,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getAUser,
};
