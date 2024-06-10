import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().min(3, "Name is required)").max(255),
  code: z.string().min(3).max(6),
});
