/*
  Warnings:

  - You are about to drop the column `perfil` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `idPerfil` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `perfil`,
    ADD COLUMN `idPerfil` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Reservacion_Mesa` (
    `idMesa` BIGINT NOT NULL,
    `idReservacion` BIGINT NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`idMesa`, `idReservacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal_Producto` (
    `idProducto` BIGINT NOT NULL,
    `idSucursal` BIGINT NOT NULL,

    PRIMARY KEY (`idProducto`, `idSucursal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura_Encabezado` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `numero_tarjeta` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL,
    `idTipoTarjeta` INTEGER NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura_Detalle` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `impuesto` DECIMAL(65, 30) NOT NULL,
    `total_detalle` DECIMAL(65, 30) NOT NULL,
    `idFactura_Encabezado` BIGINT NOT NULL,
    `idProducto` BIGINT NOT NULL,

    PRIMARY KEY (`id`, `idFactura_Encabezado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido_Producto` (
    `idPedido` BIGINT NOT NULL,
    `idProducto` BIGINT NOT NULL,
    `notas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPedido`, `idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idPerfil_fkey` FOREIGN KEY (`idPerfil`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservacion_Mesa` ADD CONSTRAINT `Reservacion_Mesa_idMesa_fkey` FOREIGN KEY (`idMesa`) REFERENCES `Mesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservacion_Mesa` ADD CONSTRAINT `Reservacion_Mesa_idReservacion_fkey` FOREIGN KEY (`idReservacion`) REFERENCES `Reservacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sucursal_Producto` ADD CONSTRAINT `Sucursal_Producto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sucursal_Producto` ADD CONSTRAINT `Sucursal_Producto_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura_Encabezado` ADD CONSTRAINT `Factura_Encabezado_idTipoTarjeta_fkey` FOREIGN KEY (`idTipoTarjeta`) REFERENCES `TipoTarjeta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura_Encabezado` ADD CONSTRAINT `Factura_Encabezado_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura_Detalle` ADD CONSTRAINT `Factura_Detalle_idFactura_Encabezado_fkey` FOREIGN KEY (`idFactura_Encabezado`) REFERENCES `Factura_Encabezado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura_Detalle` ADD CONSTRAINT `Factura_Detalle_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido_Producto` ADD CONSTRAINT `Pedido_Producto_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido_Producto` ADD CONSTRAINT `Pedido_Producto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
