import { z } from "zod";

export const bggSearchSchema = z.object({
  queryString: z.string(),
});
