import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLoginUser } from "./Auth.validation";
import jwt from "jsonwebtoken";

const loginUser = async ({ email, password }: TLoginUser) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const jwtPayload = {
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayloaY);

  return accessToken;
};

export const AuthServices = {
  loginUser,
};
