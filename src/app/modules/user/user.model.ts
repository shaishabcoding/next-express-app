import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>({
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
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

const cleanPassword = function (doc: TUser | TUser[]) {
  if (Array.isArray(doc)) {
    doc.forEach((d) => {
      d.password = "";
    });
  } else {
    doc.password = "";
  }
};

userSchema.post("save", function (doc, next) {
  cleanPassword(doc);
  next();
});

userSchema.post("find", function (docs, next) {
  cleanPassword(docs);
  next();
});

userSchema.post("findOne", function (doc, next) {
  cleanPassword(doc);
  next();
});

const User = model<TUser>("User", userSchema);

export default User;
