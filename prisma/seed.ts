import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin Admin",
      password: await bcrypt.hash("password", 10),
      role: Role.ADMIN,
    },
  });
  const external_user = await prisma.user.upsert({
    where: { email: "external@user.com" },
    update: {},
    create: {
      email: "external@user.com",
      name: "External User",
      password: await bcrypt.hash("password", 10),
      role: Role.EXTERNAL,
    },
  });

  console.log({ admin, external_user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
