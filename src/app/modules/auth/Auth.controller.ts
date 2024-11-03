import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";

const login: RequestHandler = catchAsync(async (req, res) => {
  const { body } = req;
  const result = await AuthServices.loginUser(body);
  // const result = await UserServices.createUserIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully!",
    data: result,
  });
});

export const AuthController = {
  login,
};
