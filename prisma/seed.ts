import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const lpf = await prisma.organization.upsert({
    where: { code: "LPF" },
    update: {},
    create: {
      name: "Lets Play Foundation",
      code: "LPF",
    },
  });

  const externalOrg = await prisma.organization.upsert({
    where: { code: "EXTORG" },
    update: {},
    create: {
      name: "Test External Org",
      code: "EXTORG",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {
      email: "admin@admin.com",
      name: "Admin Admin",
      password: await bcrypt.hash("password", 10),
      role: Role.ADMIN,
      organizationId: lpf.id,
    },
    create: {
      email: "admin@admin.com",
      name: "Admin Admin",
      password: await bcrypt.hash("password", 10),
      role: Role.ADMIN,
      organizationId: lpf.id,
    },
  });

  const external_user = await prisma.user.upsert({
    where: { email: "external@user.com" },
    update: {
      email: "external@user.com",
      name: "External User",
      password: await bcrypt.hash("password", 10),
      role: Role.EXTERNAL,
      organizationId: externalOrg.id,
    },
    create: {
      email: "external@user.com",
      name: "External User",
      password: await bcrypt.hash("password", 10),
      role: Role.EXTERNAL,
      organizationId: externalOrg.id,
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
