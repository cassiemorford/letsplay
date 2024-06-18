import { z } from "zod";

export const bggSearchSchema = z.object({
  queryString: z.string(),
});

export const bggGameInfoSchema = z.object({
  bggId: z.number(),
});
