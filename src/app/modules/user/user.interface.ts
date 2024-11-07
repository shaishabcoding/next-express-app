import { Model, Types } from "mongoose";

export type TUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "male" | "female";
  email: string;
  password: string;
  dateOfBirth: Date;
  contactNo: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
};

export type TUserMethods = {
  isUserExist(id: Types.ObjectId): Promise<TUser | null>;
};

export type TUserModel = Model<TUser, Record<string, never>, TUserMethods>;
