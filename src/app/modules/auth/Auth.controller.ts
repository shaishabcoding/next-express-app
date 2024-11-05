import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";
import config from "../../config";

const login: RequestHandler = catchAsync(async (req, res) => {
  const { body } = req;
  const { accessToken, refreshToken } = await AuthServices.loginUser(body);

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env !== "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully!",
    data: { accessToken },
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password has changed successfully!",
    data: null,
  });
});

const forgetPassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset link sent successfully!",
    data: null,
  });
});

const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset link sent successfully!",
    data: null,
  });
});

export const AuthController = {
  login,
  changePassword,
  forgetPassword,
  resetPassword,
};
