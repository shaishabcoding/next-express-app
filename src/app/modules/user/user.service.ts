import { Types } from "mongoose";
import { TUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (user: TUser) => await User.create(user);
const getAllUserFromDB = async () => await User.find();
const getAUserFromDB = async (id: Types.ObjectId) => await User.findById(id);

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getAUserFromDB,
};
