/*
  Warnings:

  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `token`;

-- CreateTable
CREATE TABLE `user_x_token` (
    `token` TEXT NOT NULL,
    `user_dni` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_dni`, `token`(500))
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_x_token` ADD CONSTRAINT `user_x_token_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;
