import { Prisma } from "@prisma/client";

export type UserWithOrganization = Prisma.UserGetPayload<{
  include: { organization: true };
}>;
