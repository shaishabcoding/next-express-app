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
};
