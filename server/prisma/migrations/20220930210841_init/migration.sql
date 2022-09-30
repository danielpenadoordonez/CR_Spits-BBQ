/*
  Warnings:

  - You are about to drop the column `idTipoTarjeta` on the `factura_encabezado` table. All the data in the column will be lost.
  - You are about to drop the `tipotarjeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idTipoPago` to the `Factura_Encabezado` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `factura_encabezado` DROP FOREIGN KEY `Factura_Encabezado_idTipoTarjeta_fkey`;

-- AlterTable
ALTER TABLE `factura_encabezado` DROP COLUMN `idTipoTarjeta`,
    ADD COLUMN `idTipoPago` INTEGER NOT NULL,
    ADD COLUMN `tarjeta` ENUM('VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'JCB', 'DISCOVER', 'NULL') NULL DEFAULT 'NULL',
    MODIFY `numero_tarjeta` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pedido_producto` ADD COLUMN `cantidad` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `tipotarjeta`;

-- CreateTable
CREATE TABLE `TipoPago` (
    `id` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Factura_Encabezado` ADD CONSTRAINT `Factura_Encabezado_idTipoPago_fkey` FOREIGN KEY (`idTipoPago`) REFERENCES `TipoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
