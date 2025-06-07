-- CreateTable
CREATE TABLE `routes` (
    `route_id` INTEGER NOT NULL AUTO_INCREMENT,
    `route` VARCHAR(191) NOT NULL DEFAULT 'http://localhost:3000/api/',
    `http_method` VARCHAR(191) NOT NULL,

    INDEX `routes_route_id_idx`(`route_id`),
    PRIMARY KEY (`route_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routes_x_roles` (
    `route_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `users_x_rol_route_id_fkey`(`role_id`),
    PRIMARY KEY (`route_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `routes_x_roles` ADD CONSTRAINT `routes_x_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routes_x_roles` ADD CONSTRAINT `routes_x_roles_route_id_fkey` FOREIGN KEY (`route_id`) REFERENCES `routes`(`route_id`) ON DELETE CASCADE ON UPDATE CASCADE;
