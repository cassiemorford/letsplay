import { z } from "zod";

export const wishlistItemCreationSchema = z.object({
  gameId: z.number(),
  organizationId: z.number(),
});
