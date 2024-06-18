import { z } from "zod";

export const gameCreationSchema = z.object({
  name: z.string(),
  bggId: z.number(),
});
