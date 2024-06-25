/*
  Warnings:

  - A unique constraint covering the columns `[gameId,organizationId]` on the table `WishlistItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `WishlistItem_gameId_organizationId_key` ON `WishlistItem`(`gameId`, `organizationId`);
