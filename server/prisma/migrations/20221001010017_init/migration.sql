-- CreateTable
CREATE TABLE `Perfil` (
    `id` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido1` VARCHAR(191) NOT NULL,
    `apellido2` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `clave` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `idPerfil` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_correo_username_telefono_key`(`correo`, `username`, `telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeseroOnSucursal` (
    `idSucursal` BIGINT NOT NULL,
    `idMesero` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idSucursal`, `idMesero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `id` BIGINT NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `capacidad` BIGINT NOT NULL,

    UNIQUE INDEX `Sucursal_codigo_nombre_key`(`codigo`, `nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesa` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `disponibilidad` BOOLEAN NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `idSucursal` BIGINT NOT NULL,

    UNIQUE INDEX `Mesa_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservacion` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `fecha_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idSucursal` BIGINT NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservacion_Mesa` (
    `idMesa` BIGINT NOT NULL,
    `idReservacion` BIGINT NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`idMesa`, `idReservacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria_Producto` (
    `id` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_Producto_descripcion_key`(`descripcion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` BIGINT NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `ingredientes` VARCHAR(191) NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `estado` INTEGER NOT NULL,
    `idCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal_Producto` (
    `idProducto` BIGINT NOT NULL,
    `idSucursal` BIGINT NOT NULL,

    PRIMARY KEY (`idProducto`, `idSucursal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoPago` (
    `id` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura_Encabezado` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `numero_tarjeta` VARCHAR(191) NULL,
    `tarjeta` ENUM('VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'JCB', 'DISCOVER', 'NULL') NULL DEFAULT 'NULL',
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `idTipoPago` INTEGER NOT NULL,

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
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `notas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPedido`, `idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idPerfil_fkey` FOREIGN KEY (`idPerfil`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeseroOnSucursal` ADD CONSTRAINT `MeseroOnSucursal_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeseroOnSucursal` ADD CONSTRAINT `MeseroOnSucursal_idMesero_fkey` FOREIGN KEY (`idMesero`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mesa` ADD CONSTRAINT `Mesa_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservacion` ADD CONSTRAINT `Reservacion_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservacion` ADD CONSTRAINT `Reservacion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservacion_Mesa` ADD CONSTRAINT `Reservacion_Mesa_idMesa_fkey` FOREIGN KEY (`idMesa`) REFERENCES `Mesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservacion_Mesa` ADD CONSTRAINT `Reservacion_Mesa_idReservacion_fkey` FOREIGN KEY (`idReservacion`) REFERENCES `Reservacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria_Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sucursal_Producto` ADD CONSTRAINT `Sucursal_Producto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sucursal_Producto` ADD CONSTRAINT `Sucursal_Producto_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura_Encabezado` ADD CONSTRAINT `Factura_Encabezado_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura_Encabezado` ADD CONSTRAINT `Factura_Encabezado_idTipoPago_fkey` FOREIGN KEY (`idTipoPago`) REFERENCES `TipoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
