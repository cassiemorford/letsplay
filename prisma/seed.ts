import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  // Organizations
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

  // Users
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

  // Games
  const gameData = [
    { title: "Scythe", bggId: 169786 },
    { title: "Scout", bggId: 291453 },
    { title: "Wingspan", bggId: 266192 },
  ];
  gameData.forEach(async (g) => {
    await prisma.game.upsert({
      where: { bggId: g.bggId },
      update: g,
      create: g,
    });
  });

  // Game Instances
  await prisma.gameInstance.deleteMany();
  const scoutGame = await prisma.game.findFirst({
    where: { title: "Scout" },
  });
  const wingspanGame = await prisma.game.findFirst({
    where: { title: "Wingspan" },
  });

  if (scoutGame) {
    await prisma.gameInstance.create({
      data: {
        borrowerId: lpf.id,
        gameId: scoutGame.id,
      },
    });
  }

  if (wingspanGame) {
    await prisma.gameInstance.create({
      data: {
        borrowerId: externalOrg.id,
        gameId: wingspanGame.id,
      },
    });
  }
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
