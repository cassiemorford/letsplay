import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required)").max(255),
  email: z.string().email("This is not a valid email."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255)
    .or(z.literal("")),
  role: z.string().min(3, "Role is required").max(10),
});
