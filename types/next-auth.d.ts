import NextAuth, { DefaultSession } from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: { email: string; role: string } & DefaultSession["user"];
  }

  interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    organizationId: number;
  }
}

declare module "next-auth/jwt" {
  interface jwt {
    role: string;
  }
}
