import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, TUserMethods, TUserModel } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser, TUserModel, TUserMethods>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.id;
        delete ret.__v;
        delete ret.name._id;
        delete ret.name.id;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.virtual("name.fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.methods.isUserExist = async (id: Types.ObjectId) =>
  await User.findById(id);

const User = model<TUser>("User", userSchema);

export default User;
