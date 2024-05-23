/*
  Warnings:

  - Added the required column `tagLine` to the `Summoner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Summoner` ADD COLUMN `tagLine` VARCHAR(191) NOT NULL;
