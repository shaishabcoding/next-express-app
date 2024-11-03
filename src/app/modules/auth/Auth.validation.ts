import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
