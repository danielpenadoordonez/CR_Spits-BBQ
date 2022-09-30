/*
  Warnings:

  - You are about to drop the `mesero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `mesero` DROP FOREIGN KEY `Mesero_idSucursal_fkey`;

-- DropTable
DROP TABLE `mesero`;

-- CreateTable
CREATE TABLE `MeseroOnSucursal` (
    `idSucursal` BIGINT NOT NULL,
    `idMesero` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idSucursal`, `idMesero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MeseroOnSucursal` ADD CONSTRAINT `MeseroOnSucursal_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeseroOnSucursal` ADD CONSTRAINT `MeseroOnSucursal_idMesero_fkey` FOREIGN KEY (`idMesero`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
