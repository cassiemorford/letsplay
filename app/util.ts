import prisma from "@/prisma/db";
import { Session } from "next-auth";

export const getUserWithOrganization = async (session: Session | null) => {
  if (!session) return;

  return await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    include: {
      organization: {
        include: {
          borrowedGames: {
            include: {
              game: true,
              borrower: true,
            },
          },
        },
      },
    },
  });
};
