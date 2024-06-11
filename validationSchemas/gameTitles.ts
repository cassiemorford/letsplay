import { z } from "zod";

export const gameTitleCreationSchema = z.object({
  bggId: z.number(),
  title: z.string(),
});
