import zod from "zod";

export const signupSchema = zod.object({
  email: zod.string().email("Email must be a valid email address and include special characters like '@' and '.'"),
  username: zod.string().min(4, "Username must be at least 4 characters long").max(20, "Username cannot exceed 20 characters"),
  password: zod
    .string()
    .min(8, "Password too small (must be at least 8 characters)")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password doesn't contain special char (e.g., !@#$%^&*)"),
});

export const signinSchema = zod.object({
  username: zod.string().min(1, "Username is required"),
  password: zod.string().min(1, "Password is required"),
});

