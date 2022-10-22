import { PrismaClient } from "@prisma/client";
import { profiles } from "./seeds/profiles";
import { categoria_producto } from "./seeds/categoriaProducto";
import { estadospedidos } from "./seeds/estadopedido";
import { disponibilidadmesas } from "./seeds/disponibilidadMesas";
import { sucursales } from "./seeds/sucursales";
import { users } from "./seeds/users";
import { meserosOnSucursal } from "./seeds/meseroOnSucursal";
import { tables } from "./seeds/tables";
import { tiposPago } from "./seeds/tipoPago";
import { productos } from "./seeds/productos";
import { pedidos } from "./seeds/pedidos";
import { pedido_producto } from "./seeds/pedidoProducto";
import { sucursalProducto } from "./seeds/sucursalProducto";


const prismaClient = new PrismaClient();

//* Entregable 4: productos, mesas y comandas.
//* Con su lista y detalle

async function main() {
    //! Creación de los registros de las tablas primarias, sin dependencias

    await prismaClient.perfil.createMany({
        data: profiles
    });

    await prismaClient.disponibilidadMesa.createMany({
        data: disponibilidadmesas
    });

    await prismaClient.categoria_Producto.createMany({
        data: categoria_producto
    });

    await prismaClient.tipoPago.createMany({
        data: tiposPago
    });

    await prismaClient.estadoPedido.createMany({
        data: estadospedidos
    });

    //! Creacion de los registros de las tablas secundarias con dependencias (1:N)

    await prismaClient.usuario.createMany({
        data: users
    });

    await prismaClient.sucursal.createMany({
        data: sucursales
    });

    //* Mesa necesita una sucursal asociada
    await prismaClient.mesa.createMany({
        data: tables
    });

    await prismaClient.producto.createMany({
        data: productos
    });

    //* Pedidos necesitan: mesa?, sucursal, mesero, cliente...
    await prismaClient.pedido.createMany({
        data: pedidos
    });

    //! Creación de los registros con doble dependencia (M:N)

    await prismaClient.pedido_Producto.createMany({
        data: pedido_producto
    });

    await prismaClient.meseroOnSucursal.createMany({
        data: meserosOnSucursal
    });

    await prismaClient.sucursal_Producto.createMany({
        data: sucursalProducto
    });
};

main()
    .then(async () => {
        await prismaClient.$disconnect();
    })
    .catch(async e => {
        console.error(`Error: ${e}`);
        await prismaClient.$disconnect();
        process.exit(1);
    });

 //! DEBEN INSTALAR TS y TS Node, Sino error fijo