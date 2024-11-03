import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const login: RequestHandler = catchAsync(async (req, res) => {
  const { body } = req;

  // const result = await UserServices.createUserIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully!",
    data: body,
  });
});

export const AuthController = {
  login,
};
