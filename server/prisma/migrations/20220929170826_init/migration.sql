/*
  Warnings:

  - You are about to drop the column `idPerfil` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `factura_detalle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `factura_encabezado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mesero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedido_producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservacion_mesa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sucursal_producto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `perfil` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `factura_detalle` DROP FOREIGN KEY `Factura_Detalle_idFactura_Encabezado_fkey`;

-- DropForeignKey
ALTER TABLE `factura_detalle` DROP FOREIGN KEY `Factura_Detalle_idProducto_fkey`;

-- DropForeignKey
ALTER TABLE `factura_encabezado` DROP FOREIGN KEY `Factura_Encabezado_idTipoTarjeta_fkey`;

-- DropForeignKey
ALTER TABLE `factura_encabezado` DROP FOREIGN KEY `Factura_Encabezado_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `mesero` DROP FOREIGN KEY `Mesero_idSucursal_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `pedido_producto` DROP FOREIGN KEY `Pedido_Producto_idPedido_fkey`;

-- DropForeignKey
ALTER TABLE `pedido_producto` DROP FOREIGN KEY `Pedido_Producto_idProducto_fkey`;

-- DropForeignKey
ALTER TABLE `reservacion_mesa` DROP FOREIGN KEY `Reservacion_Mesa_idMesa_fkey`;

-- DropForeignKey
ALTER TABLE `reservacion_mesa` DROP FOREIGN KEY `Reservacion_Mesa_idReservacion_fkey`;

-- DropForeignKey
ALTER TABLE `sucursal_producto` DROP FOREIGN KEY `Sucursal_Producto_idProducto_fkey`;

-- DropForeignKey
ALTER TABLE `sucursal_producto` DROP FOREIGN KEY `Sucursal_Producto_idSucursal_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_idPerfil_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `idPerfil`,
    ADD COLUMN `perfil` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `factura_detalle`;

-- DropTable
DROP TABLE `factura_encabezado`;

-- DropTable
DROP TABLE `mesero`;

-- DropTable
DROP TABLE `pedido`;

-- DropTable
DROP TABLE `pedido_producto`;

-- DropTable
DROP TABLE `reservacion_mesa`;

-- DropTable
DROP TABLE `sucursal_producto`;

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
