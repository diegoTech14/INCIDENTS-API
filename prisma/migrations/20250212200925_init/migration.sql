-- CreateTable
CREATE TABLE `roles` (
    `rol_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `general_logs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(11) NOT NULL,

    INDEX `general_logs_user_id_idx`(`user_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `dni` VARCHAR(11) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_surname` VARCHAR(191) NOT NULL,
    `second_surname` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_departmentId_fkey`(`departmentId`),
    PRIMARY KEY (`dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_x_incident` (
    `assign_code` INTEGER NOT NULL AUTO_INCREMENT,
    `user_dni` VARCHAR(11) NOT NULL,
    `incident_id` VARCHAR(12) NOT NULL,
    `assign_date` DATETIME(3) NOT NULL,

    INDEX `user_x_incident_user_dni_incident_id_idx`(`user_dni`, `incident_id`),
    INDEX `user_x_incident_incident_id_fkey`(`incident_id`),
    PRIMARY KEY (`assign_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_change_status_incidents` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `incident_id` VARCHAR(12) NOT NULL,
    `change_date` DATETIME(3) NOT NULL,
    `current_status` INTEGER NOT NULL,
    `previous_state` INTEGER NOT NULL,
    `user_dni` VARCHAR(11) NOT NULL,

    INDEX `log_change_status_incidents_incident_id_user_dni_idx`(`incident_id`, `user_dni`),
    INDEX `log_change_status_incidents_user_dni_fkey`(`user_dni`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_x_rol` (
    `user_dni` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `users_x_rol_role_id_fkey`(`role_id`),
    PRIMARY KEY (`user_dni`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_effects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_risks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incident_priorities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incidents` (
    `incident_id` VARCHAR(12) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `close_justification` VARCHAR(191) NULL,
    `incident_place` VARCHAR(191) NOT NULL,
    `record_date` DATETIME(3) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `time_to_solve` INTEGER NOT NULL,
    `user_dni` VARCHAR(11) NOT NULL,
    `effect_id` INTEGER NOT NULL,
    `risk_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `priority_id` INTEGER NOT NULL,
    `status_id` INTEGER NOT NULL,

    INDEX `incidents_user_dni_idx`(`user_dni`),
    INDEX `incidents_effect_id_risk_id_category_id_priority_id_status_i_idx`(`effect_id`, `risk_id`, `category_id`, `priority_id`, `status_id`),
    INDEX `incidents_category_id_fkey`(`category_id`),
    INDEX `incidents_priority_id_fkey`(`priority_id`),
    INDEX `incidents_risk_id_fkey`(`risk_id`),
    INDEX `incidents_status_id_fkey`(`status_id`),
    PRIMARY KEY (`incident_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diagnosis` (
    `diagnosis_id` INTEGER NOT NULL AUTO_INCREMENT,
    `diagnosis_date` DATETIME(3) NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `estimated_time` INTEGER NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `buy` BOOLEAN NOT NULL,
    `user_dni` VARCHAR(11) NOT NULL,
    `incident_id` VARCHAR(12) NOT NULL,

    INDEX `diagnosis_user_dni_incident_id_idx`(`user_dni`, `incident_id`),
    INDEX `diagnosis_incident_id_fkey`(`incident_id`),
    PRIMARY KEY (`diagnosis_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_users_x_rol` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `_users_x_rol_AB_unique`(`A`, `B`),
    INDEX `_users_x_rol_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `general_logs` ADD CONSTRAINT `general_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_x_incident` ADD CONSTRAINT `user_x_incident_incident_id_fkey` FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`incident_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_x_incident` ADD CONSTRAINT `user_x_incident_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_change_status_incidents` ADD CONSTRAINT `log_change_status_incidents_incident_id_fkey` FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`incident_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_change_status_incidents` ADD CONSTRAINT `log_change_status_incidents_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_x_rol` ADD CONSTRAINT `users_x_rol_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_x_rol` ADD CONSTRAINT `users_x_rol_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `incident_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_effect_id_fkey` FOREIGN KEY (`effect_id`) REFERENCES `incident_effects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_priority_id_fkey` FOREIGN KEY (`priority_id`) REFERENCES `incident_priorities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_risk_id_fkey` FOREIGN KEY (`risk_id`) REFERENCES `incident_risks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `incident_status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis` ADD CONSTRAINT `diagnosis_incident_id_fkey` FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`incident_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis` ADD CONSTRAINT `diagnosis_user_dni_fkey` FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_users_x_rol` ADD CONSTRAINT `_users_x_rol_A_fkey` FOREIGN KEY (`A`) REFERENCES `roles`(`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_users_x_rol` ADD CONSTRAINT `_users_x_rol_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`dni`) ON DELETE CASCADE ON UPDATE CASCADE;
