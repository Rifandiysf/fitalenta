/*
  Warnings:

  - You are about to drop the column `description` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `short` on the `services` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `services` DROP COLUMN `description`,
    DROP COLUMN `duration`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `short`,
    ADD COLUMN `content` JSON NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `summary` TEXT NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `services_slug_key` ON `services`(`slug`);
