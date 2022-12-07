import { PrismaClient } from "@prisma/client";
import { profiles } from "./seeds/profiles";
import { categoria_producto } from "./seeds/categoriaProducto";
import { estadospedidos } from "./seeds/estadopedido";
import { disponibilidadmesas } from "./seeds/disponibilidadmesas";
import { sucursales } from "./seeds/sucursales";
import { users } from "./seeds/users";
import { tables } from "./seeds/tables";
import { tiposPago } from "./seeds/tipoPago";
import { tiposPedido } from "./seeds/tipoPedido"
import { tiposTarjeta } from "./seeds/tiposTarjeta";
import { pedidos } from "./seeds/pedidos";
import { pedido_producto } from "./seeds/pedidoProducto";
import { reservaciones } from "./seeds/reservacionesMesas";
import { facturaEncabezados } from "./seeds/facturaEncabezados";



const prismaClient = new PrismaClient();

//* Entregable 6: cambios aplicados a la db 16/11/2022

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

    await prismaClient.tipoPedido.createMany({
        data: tiposPedido
    });
    await prismaClient.tipoTarjeta.createMany({
        data: tiposTarjeta
    });

    //! Creacion de los registros de las tablas secundarias con dependencias (1:N)

    await prismaClient.sucursal.createMany({
        data: sucursales
    });

    await prismaClient.usuario.createMany({
        data: users
    });

    //? Meseros y admins - Debido a su tabla intermedia, clientes usan el users seeds

    await prismaClient.usuario.create({
        data: {
            //* 1
            id: "118200576",
            nombre: "Daniel",
            apellido1: "Penado",
            apellido2: "Ordóñez",
            correo: "penadodan02@gmail.com",
            username: "danielpenado",
            clave: "$2b$10$0cadEyo5sb.G596V2T1IreNir2S.sQ/NqmFjrIeK6YrykVM1JSBwa",
            salt: "$2b$10$0cadEyo5sb.G596V2T1Ire",
            //? Clave sin hash: Linux&Python
            telefono: "83121660",
            direccion: "Atenas, Alajuela",
            idPerfil: 1, //! Admin
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] //? Asignado a todas las sucursales
            }
        }
    });

    await prismaClient.usuario.create({
        data: {
            //* 2
            id: "118010156",
            nombre: "Isaac",
            apellido1: "Barquero",
            apellido2: "Lizano",
            correo: "isaacbarquero22@gmail.com",
            username: "isaacbarliz",
            clave: "$2b$10$cyuD3edUd9Xz2EjGJn/wK.rlO1IuUe5UNou10fxbSRdqlkV03SVme",
            //? Clave sin hash: front-end-css
            salt: "$2b$10$cyuD3edUd9Xz2EjGJn/wK.",
            telefono: "64645793",
            direccion: "Alajuela",
            idPerfil: 1, //! Admin
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] //? Asignado a todas las sucursales
            }
        }
    });

    await prismaClient.usuario.create({
        data: {
            //* 3
            id: "208320565",
            nombre: "Mario",
            apellido1: "Ballestero",
            apellido2: "Campos",
            correo: "maritoxd1@gmail.com",
            username: "marito",
            clave: "$2b$10$gdPlpT6yklob2C1gGLNg1ekwJpKS989NzwQDEIeFlvS9kvdataV4i",
            //? Clave sin hash: maritocrspitsbbq
            salt: "$2b$10$gdPlpT6yklob2C1gGLNg1e",
            telefono: "83140136",
            direccion: "Grecia, Alajuela",
            idPerfil: 1, //! Admin
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] //? Asignado a todas las sucursales
            }
        }
    });


    await prismaClient.usuario.create({
        data: {
            //* 4
            id: "365730621",
            nombre: "Christian",
            apellido1: "Mora",
            apellido2: "Quesada",
            correo: "cristhianmora@hotmail.com",
            username: "christianMora",
            clave: "$2b$10$i8P5PTnTX80.8NZsM.DwXe0nV1p3MeoKsgo54zDSiqZHSDC0V2lKW",
            //? Clave sin hash: 123456789
            salt: "$2b$10$i8P5PTnTX80.8NZsM.DwXe",
            telefono: "74601503",
            direccion: "Turrialba, cartago",
            idPerfil: 2, //? Mesero - Sucursal 2
            sucursales: {
                connect: [{ id: 2 }] //? Asignada a la sucursal de Heredia
            }
        }
    });

    await prismaClient.usuario.create({
        data: {
            //* 5
            id: "463650893",
            nombre: "María",
            apellido1: "Molina",
            apellido2: "Arroyo",
            correo: "mariaarroyo@gmail.com",
            username: "mariaMolina",
            clave: "$2b$10$i8P5PTnTX80.8NZsM.DwXe0nV1p3MeoKsgo54zDSiqZHSDC0V2lKW",
            //? Clave sin hash: 123456789
            salt: "$2b$10$i8P5PTnTX80.8NZsM.DwXe",
            telefono: "74670781",
            direccion: "Santa Barbara, Heredia",
            idPerfil: 2, //? Mesero - Sucursal 1
            sucursales: {
                connect: [{ id: 1 }] //? Asignada a la sucursal de Alajuela
            }
        }
    });

    await prismaClient.usuario.create({
        data: {
            //* 6
            id: "40625724512",
            nombre: "Belén",
            apellido1: "Alfaro",
            apellido2: "Ruíz",
            correo: "belenalfaro@gmail.com",
            username: "belenAlfaro",
            clave: "$2b$10$i8P5PTnTX80.8NZsM.DwXe0nV1p3MeoKsgo54zDSiqZHSDC0V2lKW",
            //? Clave sin hash: 123456789
            salt: "$2b$10$i8P5PTnTX80.8NZsM.DwXe",
            telefono: "68036014",
            direccion: "La Rivera, Heredia",
            idPerfil: 2, //? Mesero - Sucursal 3
            sucursales: {
                connect: [{ id: 3 }] //? Asignada a la sucursal de San José
            }
        }
    });

    await prismaClient.usuario.create({
        data: {
            id: "207636120",
            nombre: "Gary",
            apellido1: "Flores",
            apellido2: "Paniagua",
            correo: "garyflores@gmail.com",
            username: "garyFlores",
            clave: "$2b$10$i8P5PTnTX80.8NZsM.DwXe0nV1p3MeoKsgo54zDSiqZHSDC0V2lKW",
            //? Clave sin hash: 123456789
            salt: "$2b$10$i8P5PTnTX80.8NZsM.DwXe",
            telefono: "10596839",
            direccion: "Naranjo, Alajuela",
            idPerfil: 2, //? Mesero - Sucursal 4
            sucursales: {
                connect: [{ id: 4 }] //? Asignada a la sucursal de Cartago
            }
        }
    });

    //* Mesa necesita una sucursal asociada
    await prismaClient.mesa.createMany({
        data: tables
    });

    //await prismaClient.producto.createMany({
    //  data: productos
    //});
    //* Corresponden a los distintos productos que se ofrecen (platos)

    //! Nota: id eliminado debido a que ahora es autoincrement

    //* Create de productos
    //? Categoría 1 - Bebidas

    await prismaClient.producto.create({
        data: {
            nombre: 'Té frío de limón',
            descripcion: 'bebida natural',
            ingredientes: '',
            precio: 500,
            imagen: 'https://i.ibb.co/6bCrPwc/te-frio.png',
            estado: true, //* Habilitado / deshabilitado
            idCategoria: 1,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Coca Cola',
            descripcion: 'bebida gaseosa',
            ingredientes: '',
            precio: 800,
            imagen: 'https://i.ibb.co/GQbbLHR/coca-cola.png',
            estado: true,
            idCategoria: 1,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Café negro',
            descripcion: 'Café 1820 a gusto, incluye sobres de azúcar',
            ingredientes: '',
            precio: 750,
            imagen: 'https://i.ibb.co/4Pxnp4b/cafenegro.png',
            estado: true,
            idCategoria: 1,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Batido natural',
            descripcion: 'batidos de guanabana, fresa, mango y sandía',
            ingredientes: 'zumo de fruta',
            precio: 1500,
            imagen: 'https://i.ibb.co/b7LLYpZ/batido.png',
            estado: true,
            idCategoria: 1,
            sucursales: {
                connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Imperial',
            descripcion: 'Cerveza',
            ingredientes: '',
            precio: 1000,
            imagen: 'https://i.ibb.co/9sMcwJN/imperial.png',
            estado: true,
            idCategoria: 1,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    //? Categoría 2 - Entradas

    await prismaClient.producto.create({
        data: {
            nombre: 'Patacones',
            descripcion: 'plato de entrada',
            ingredientes: 'Plátano verde',
            precio: 1500,
            imagen: 'https://i.ibb.co/rfgBYP4/patacones.png',
            estado: true,
            idCategoria: 2,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Pinchos a la parilla',
            descripcion: 'mixto de pollo y cerdo',
            ingredientes: 'carne de res, de pollo pimentón rojo y verde',
            precio: 1200,
            imagen: 'https://i.ibb.co/7NPCnLV/pincho.png',
            estado: true,
            idCategoria: 2,
            sucursales: {
                connect: [{ id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Costillas BBQ',
            descripcion: 'de cerdo ahumadas con salsa BBQ incluida',
            ingredientes: '',
            precio: 2000,
            imagen: 'https://i.ibb.co/yFvcdV8/Costilla.png',
            estado: true,
            idCategoria: 2,
            sucursales: {
                connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Papas fritas',
            descripcion: 'papas a la francesa incluye sobres de mayonesa, ketchup y mostaza',
            ingredientes: '',
            precio: 1000,
            imagen: 'https://i.ibb.co/SB1QWCT/papas-fritas.png',
            estado: true,
            idCategoria: 2,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Dedos de Pollo',
            descripcion: 'empanizados con salsa BBQ y papas fritas',
            ingredientes: 'pollo, salsa BBQ, papas',
            precio: 1200,
            imagen: 'https://i.ibb.co/VTD96MK/dedospollo.png',
            estado: true,
            idCategoria: 2,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    //? Categoría 3 - Carnes

    await prismaClient.producto.create({
        data: {
            nombre: 'Pincho de res',
            descripcion: '4 pinchos grandes de res',
            ingredientes: 'carne de res',
            precio: 2500,
            imagen: 'https://i.ibb.co/84bCCvV/brocheta-res.png',
            estado: true,
            idCategoria: 3,
            sucursales: {
                connect: [{ id: 2 }, { id: 3 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'New York Steak',
            descripcion: 'corte de carne New York al gusto, con papas horneadas con tocineta y queso',
            ingredientes: 'carne de res, papas, tocineta, queso',
            precio: 8500,
            imagen: 'https://i.ibb.co/wdPxC6G/new-york-steak.png',
            estado: true,
            idCategoria: 3,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Baby Back Ribs',
            descripcion: '6 costillas en un adobo hecho a base de salsa BBQ con papas a la francesa',
            ingredientes: 'costillas de cerdo, papas',
            precio: 9500,
            imagen: 'https://i.ibb.co/bJXSrFr/baby-back-rips.png',
            estado: true,
            idCategoria: 3,
            sucursales: {
                connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Hamburguesa CRSpits',
            descripcion: 'Hamburguesa con doble torta de carne Angus, con tocineta, doble queso, hongos salteados, salsa BBQ',
            ingredientes: 'carne Angus, tocineta, hongos, queso, salsa BBQ',
            precio: 5500,
            imagen: 'https://i.ibb.co/FhTxpsq/hamburguesa-CRSpits.png',
            estado: true,
            idCategoria: 3,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Pollo Tejano',
            descripcion: 'Pollo cocinado el horno con salsa de mostaza y BBQ, con queso derretido con hongos y tocineta encima acompañado de papas horneadas con tocineta y queso',
            ingredientes: 'pollo, salsa de mostaza, BBQ, tocineta, hongos, queso, papas',
            precio: 6500,
            imagen: 'https://i.ibb.co/CKv2N4m/pollo-tejano.png',
            estado: true,
            idCategoria: 3,
            sucursales: {
                connect: [{ id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Asado Mixto',
            descripcion: 'Chuleta de Cerdo en Salsa BBQ, 3 chorizos con tortilla, pollo a la plancha, pico de gallo, guacamole, tortillas tostadas, frijoles molidos',
            ingredientes: 'carne de cerdo, chorizo, pollo, tomate, aguacate, tortilla, cebolla',
            precio: 12500,
            imagen: 'https://i.ibb.co/n0TVHt5/asado-mixto.png',
            estado: true,
            idCategoria: 3,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    //? Categoría 4 - Pescados

    await prismaClient.producto.create({
        data: {
            nombre: 'Mero al ajillo',
            descripcion: 'pescado blanco, con arroz blanco incluye 2 filetes pequeños y una ensalada verde',
            ingredientes: 'Mero, filetes',
            precio: 3000,
            imagen: 'https://i.ibb.co/YyTKfVZ/mero-ajillo.png',
            estado: true,
            idCategoria: 4,
            sucursales: {
                connect: [{ id: 2 }, { id: 3 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Pescado Frito',
            descripcion: 'Pargo entero frito con patacones y ensalada',
            ingredientes: 'Pargo, platano verde, repollo, zanahoria, limon',
            precio: 8000,
            imagen: 'https://i.ibb.co/wRRrvg7/pescado-frito.png',
            estado: true,
            idCategoria: 4,
            sucursales: {
                connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Pescado Empanizado',
            descripcion: 'Corvina empanizada, con pure de papas y vegetales',
            ingredientes: 'Corvina, papas, brocoli, zanahoria, mantequilla, ajo',
            precio: 7000,
            imagen: 'https://i.ibb.co/17cy0NQ/pescado-empanizado.png',
            estado: true,
            idCategoria: 4,
            sucursales: {
                connect: [{ id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    //? Categoría 5 - Mariscos

    await prismaClient.producto.create({
        data: {
            nombre: 'Mariscada',
            descripcion: 'incluye camarones, almejas, pulpo y calamar, incluye papas fritas y ensalada verde',
            ingredientes: 'orégano, chile dulce, apio, ajo',
            precio: 7500,
            imagen: 'https://i.ibb.co/LpWqRGZ/mariscada.png',
            estado: true,
            idCategoria: 5,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    });

    await prismaClient.producto.create({
        data: {
            nombre: 'Triple de Camarones',
            descripcion: 'Camarones al ajillo, empanizados y en salsa BBQ con pure de papas y vegetales',
            ingredientes: 'camarones, ajo, papas, brocoli, zanahoria, salsa BBQ',
            precio: 7500,
            imagen: 'https://i.ibb.co/w61GHrx/camarones-ajillo.png',
            estado: true,
            idCategoria: 5,
            sucursales: {
                connect: [{ id: 1 }, { id: 2 }, { id: 4 }]
            }
        }
    });

    //* Pedidos necesitan: mesa?, sucursal, mesero, cliente...
    await prismaClient.pedido.createMany({
        data: pedidos
    });

    //* Factura encabezados
    await prismaClient.factura_Encabezado.createMany({
        data: facturaEncabezados
    });

    //! Creación de los registros con doble dependencia (N:M)

    //* Reservaciones
    await prismaClient.reservacion.createMany({
        data: reservaciones
    });

    await prismaClient.pedido_Producto.createMany({
        data: pedido_producto
    });

    //* Detalles de la factura

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 2,
            precio: 1600,
            impuesto: parseFloat("208"), //* Prevención de decimales
            total_detalle: parseFloat("1808"), //* Prevención de decimales
            idFactura_Encabezado: 1,
            idProducto: 2
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 1500,
            impuesto: parseFloat("195"),
            total_detalle: parseFloat("1695"),
            idFactura_Encabezado: 1,
            idProducto: 4
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 8500,
            impuesto: parseFloat("1105"),
            total_detalle: parseFloat("9605"),
            idFactura_Encabezado: 1,
            idProducto: 12
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 8000,
            impuesto: parseFloat("1040"),
            total_detalle: parseFloat("9040"),
            idFactura_Encabezado: 1,
            idProducto: 18
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 7500,
            impuesto: parseFloat("975"),
            total_detalle: parseFloat("8475"),
            idFactura_Encabezado: 1,
            idProducto: 20
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 2,
            precio: 1600,
            impuesto: parseFloat("208"),
            total_detalle: parseFloat("1808"),
            idFactura_Encabezado: 2,
            idProducto: 5
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 2,
            precio: 2000,
            impuesto: parseFloat("260"),
            total_detalle: parseFloat("2260"),
            idFactura_Encabezado: 2,
            idProducto: 2
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 2,
            precio: 1500,
            impuesto: parseFloat("195"),
            total_detalle: parseFloat("1695"),
            idFactura_Encabezado: 2,
            idProducto: 6
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 2000,
            impuesto: parseFloat("260"),
            total_detalle: parseFloat("2260"),
            idFactura_Encabezado: 2,
            idProducto: 8
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 2500,
            impuesto: parseFloat("325"),
            total_detalle: parseFloat("2825"),
            idFactura_Encabezado: 2,
            idProducto: 11
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 2,
            precio: 25000,
            impuesto: parseFloat("3250"),
            total_detalle: parseFloat("28250"),
            idFactura_Encabezado: 2,
            idProducto: 16
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 3000,
            impuesto: parseFloat("390"),
            total_detalle: parseFloat("3390"),
            idFactura_Encabezado: 2,
            idProducto: 17
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 2,
            precio: 1600,
            impuesto: parseFloat("208"),
            total_detalle: parseFloat("1808"),
            idFactura_Encabezado: 3,
            idProducto: 2
        }
    });


    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 1500,
            impuesto: parseFloat("195"),
            total_detalle: parseFloat("1695"),
            idFactura_Encabezado: 3,
            idProducto: 4
        }
    });


    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 2,
            precio: 2000,
            impuesto: parseFloat("260"),
            total_detalle: parseFloat("2260"),
            idFactura_Encabezado: 3,
            idProducto: 9
        }
    });


    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 9500,
            impuesto: parseFloat("1235"),
            total_detalle: parseFloat("10735"),
            idFactura_Encabezado: 3,
            idProducto: 14
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 5500,
            impuesto: parseFloat("715"),
            total_detalle: parseFloat("6215"),
            idFactura_Encabezado: 3,
            idProducto: 19
        }
    });

    await prismaClient.factura_Detalle.create({
        data: {
            cantidad: 1,
            precio: 7000,
            impuesto: parseFloat("910"),
            total_detalle: parseFloat("7910"),
            idFactura_Encabezado: 3,
            idProducto: 13
        }
    });


    //* Corresponde a la asociación de la factura con el monto y tipo de pago
    //* Tipo pago factura encabezado
    await prismaClient.facturaEncabezadoTipoPago.create({
        data: {
            idFactura_Encabezado: 1,
            idTipoPago: 2,
            monto: parseFloat("30623") //* Prevención ante decimal
        }
    });

    await prismaClient.facturaEncabezadoTipoPago.create({
        data: {
            idFactura_Encabezado: 2,
            idTipoPago: 2,
            monto: parseFloat("42488") 
        }
    });

    await prismaClient.facturaEncabezadoTipoPago.create({
        data: {
            idFactura_Encabezado: 3,
            idTipoPago: 2,
            monto: parseFloat("30623") 
        }
    });

    //TODO seeds listos: tipo tarjeta, tipo pedido, tipo pago, reservaciones seed, + pedidos
    //! APIS FALTANTES: tipo tarjeta, tipo pago, tipo pedido
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