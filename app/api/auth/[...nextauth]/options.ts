import prisma from "@/prisma/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "email and Password",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        return match ? user : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || Role.EXTERNAL;
      }
      return session;
    },
  },
};
export default options;
