import { z } from "zod";

export const gameInstanceCreationSchema = z.object({
  gameId: z.number(),
});
