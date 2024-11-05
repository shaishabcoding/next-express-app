import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLoginUser } from "./Auth.validation";
import bcrypt from "bcrypt";
import { createToken } from "./Auth.utils";
import { TUser } from "../user/user.interface";
import config from "../../config";
import { sendMail } from "../../utils/sendMail";
import { makeResetBody } from "./Auth.constant";

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

  const accessToken = createToken(jwtPayload, "access");

  const refreshToken = createToken(jwtPayload, "refresh");

  return { accessToken, refreshToken };
};

const changePassword = async (
  user: TUser,
  {
    newPassword,
    oldPassword,
  }: {
    newPassword: string;
    oldPassword: string;
  }
) => {
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password!");
  }

  newPassword = await bcrypt.hash(newPassword, config.bcrypt_salt_rounds);

  console.log(newPassword);
  await User.updateOne(
    {
      email: user.email,
    },
    {
      password: newPassword,
    }
  );
};

const forgetPassword = async ({ email, role }: TUser) => {
  const jwtPayload = {
    email,
    role,
  };

  const resetToken = createToken(jwtPayload, "reset");

  await sendMail({
    to: email,
    subject: "Password Reset Request",
    body: makeResetBody(resetToken),
  });
};

const resetPassword = async ({ email, role }: TUser) => {
  const jwtPayload = {
    email,
    role,
  };

  const resetToken = createToken(jwtPayload, "reset");

  await sendMail({
    to: email,
    subject: "Password Reset Request",
    body: makeResetBody(resetToken),
  });
};

export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
};
