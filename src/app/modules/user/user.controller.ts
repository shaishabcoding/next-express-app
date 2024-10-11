import { Request, Response } from "express";
import { TUser } from "./user.interface";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response) => {
  const user = req.body as TUser;
  if (user) {
    const result = await UserServices.createUserIntoDB(user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User create successfully!",
      data: result,
    });
  }
};

export const UserControllers = {
  createUser,
};
