/*
  Warnings:

  - You are about to drop the `WishlistItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `WishlistItems`;

-- CreateTable
CREATE TABLE `WishlistItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,
    `organizationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
