/*
  Warnings:

  - Made the column `borrowerId` on table `GameInstance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `GameInstance` MODIFY `borrowerId` INTEGER NOT NULL;
