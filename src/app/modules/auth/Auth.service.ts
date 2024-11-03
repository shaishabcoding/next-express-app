import User from "../user/user.model";
import { TLoginUser } from "./Auth.validation";

const loginUser = async ({ email, password }: TLoginUser) => {
  const user = User.findOne({
    email,
  });

  return user;
};

export const AuthServices = {
  loginUser,
};
