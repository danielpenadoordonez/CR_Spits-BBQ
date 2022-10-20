import { PrismaClient } from "@prisma/client";
import { users } from "./seeds/users";
import { profiles } from "./seeds/profiles";
import { disponibilidadmesas } from "./seeds/disponibilidadmesas";
import { tables } from "./seeds/tables";
import { sucursales } from "./seeds/sucursales";
import { categoria_producto } from "./seeds/categoriaProducto";
import { pedidos } from "./seeds/pedidos";
import { productos } from "./seeds/productos";
import { pedido_producto } from "./seeds/pedido_producto";

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

    //! Creacion de los registros de las tablas secundarias con dependencias (1:N)

    await prismaClient.usuario.createMany({
        data: users
    });

    await prismaClient.pedido.createMany({
        data: pedidos
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

    //! Creación de los registros con doble dependencia (M:N)

    await prismaClient.pedido_Producto.createMany({
        data: pedido_producto
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

 //! DEBEN INSTALAR TS, Sino error fijo