-- AlterTable
ALTER TABLE `User` ADD COLUMN `organizationId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Organization_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
