import { z } from "zod";

const userValidationSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  }),
  gender: z.enum(["male", "female"]),
  email: z.string().email("Invalid email format"),
  contactNo: z.string().min(1, "Contact number is required"),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const UserValidation = {
  userValidationSchema,
};
