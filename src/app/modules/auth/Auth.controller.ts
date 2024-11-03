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

export const AuthController = {
  login,
};
