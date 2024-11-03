import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLoginUser } from "./Auth.validation";
import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./Auth.utils";

const loginUser = async ({ email, password }: TLoginUser) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (user.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Account is not active. Please contact support."
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password!");
  }

  const jwtPayload = {
    email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret,
    config.jwt_access_token_expire
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret,
    config.jwt_refresh_token_expire
  );

  return { accessToken, refreshToken };
};

export const AuthServices = {
  loginUser,
};
