import { NextFunction } from "express";
import { TUser } from "./user.interface";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const user = req.body as TUser | null;
  if (user) {
    const result = await UserServices.createUserIntoDB(user);
  }
};
