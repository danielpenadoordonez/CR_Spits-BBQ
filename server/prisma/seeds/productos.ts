//* Corresponden a los distintos productos que se ofrecen (platos)

//! Nota: id eliminado debido a que ahora es autoincrement
export const productos = [
    //? Categoría 1 - Bebidas
    {
        nombre: 'Té frío de limón',
        descripcion: 'bebida natural',
        ingredientes: '',
        precio: 500,
        imagen: 'https://i.ibb.co/6bCrPwc/te-frio.png',
        estado: true, //* Habilitado / deshabilitado
        idCategoria: 1,
    },
    {
        nombre: 'Coca Cola',
        descripcion: 'bebida gaseosa',
        ingredientes: '',
        precio: 800,
        imagen: 'https://i.ibb.co/GQbbLHR/coca-cola.png',
        estado: true,
        idCategoria: 1
    },
    {
        nombre: 'Café negro',
        descripcion: 'Café 1820 a gusto, incluye sobres de azúcar',
        ingredientes: '',
        precio: 750,
        imagen: 'https://i.ibb.co/4Pxnp4b/cafenegro.png',
        estado: true,
        idCategoria: 1
    },
    {
        nombre: 'Batido natural',
        descripcion: 'batidos de guanabana, fresa, mango y sandía',
        ingredientes: 'zumo de fruta',
        precio: 1500,
        imagen: 'https://i.ibb.co/b7LLYpZ/batido.png',
        estado: true,
        idCategoria: 1
    },
    {
        nombre: 'Imperial',
        descripcion: 'Cerveza',
        ingredientes: '',
        precio: 1000,
        imagen: 'https://i.ibb.co/9sMcwJN/imperial.png',
        estado: true,
        idCategoria: 1
    },
    //? Categoría 2 - Entradas
    {
        nombre: 'Patacones',
        descripcion: 'plato de entrada',
        ingredientes: 'Plátano verde',
        precio: 1500,
        imagen: 'https://i.ibb.co/rfgBYP4/patacones.png',
        estado: true,
        idCategoria: 2
    },
    {
        nombre: 'Pinchos a la parilla',
        descripcion: 'mixto de pollo y cerdo',
        ingredientes: 'carne de res, de pollo pimentón rojo y verde',
        precio: 1200,
        imagen: 'https://i.ibb.co/7NPCnLV/pincho.png',
        estado: true,
        idCategoria: 2
    },
    {
        nombre: 'Costillas BBQ',
        descripcion: 'de cerdo ahumadas con salsa BBQ incluida',
        ingredientes: '',
        precio: 2000,
        imagen: 'https://i.ibb.co/yFvcdV8/Costilla.png',
        estado: true,
        idCategoria: 2
    },
    {
        nombre: 'Papas fritas',
        descripcion: 'papas a la francesa incluye sobres de mayonesa, ketchup y mostaza',
        ingredientes: '',
        precio: 1000,
        imagen: 'https://i.ibb.co/SB1QWCT/papas-fritas.png',
        estado: true,
        idCategoria: 2
    },
    {
        nombre: 'Dedos de Pollo',
        descripcion: 'empanizados con salsa BBQ y papas fritas',
        ingredientes: 'pollo, salsa BBQ, papas',
        precio: 1200,
        imagen: 'https://i.ibb.co/VTD96MK/dedospollo.png',
        estado: true,
        idCategoria: 2
    },
    //? Categoría 3 - Carnes
    {
        nombre: 'Pincho de res',
        descripcion: '4 pinchos grandes de res',
        ingredientes: 'carne de res',
        precio: 2500,
        imagen: 'https://i.ibb.co/84bCCvV/brocheta-res.png',
        estado: true,
        idCategoria: 3
    },
    {
        nombre: 'New York Steak',
        descripcion: 'corte de carne New York al gusto, con papas horneadas con tocineta y queso',
        ingredientes: 'carne de res, papas, tocineta, queso',
        precio: 8500,
        imagen: 'https://i.ibb.co/wdPxC6G/new-york-steak.png',
        estado: true,
        idCategoria: 3
    },
    {
        nombre: 'Baby Back Ribs',
        descripcion: '6 costillas en un adobo hecho a base de salsa BBQ con papas a la francesa',
        ingredientes: 'costillas de cerdo, papas',
        precio: 9500,
        imagen: 'https://i.ibb.co/bJXSrFr/baby-back-rips.png',
        estado: true,
        idCategoria: 3
    },
    {
        nombre: 'Hamburguesa CRSpits',
        descripcion: 'Hamburguesa con doble torta de carne Angus, con tocineta, doble queso, hongos salteados, salsa BBQ',
        ingredientes: 'carne Angus, tocineta, hongos, queso, salsa BBQ',
        precio: 5500,
        imagen: 'https://i.ibb.co/FhTxpsq/hamburguesa-CRSpits.png',
        estado: true,
        idCategoria: 3
    },
    {
        nombre: 'Pollo Tejano',
        descripcion: 'Pollo cocinado el horno con salsa de mostaza y BBQ, con queso derretido con hongos y tocineta encima acompañado de papas horneadas con tocineta y queso',
        ingredientes: 'pollo, salsa de mostaza, BBQ, tocineta, hongos, queso, papas',
        precio: 6500,
        imagen: 'https://i.ibb.co/CKv2N4m/pollo-tejano.png',
        estado: true,
        idCategoria: 3
    },
    {
        nombre: 'Asado Mixto',
        descripcion: 'Chuleta de Cerdo en Salsa BBQ, 3 chorizos con tortilla, pollo a la plancha, pico de gallo, guacamole, tortillas tostadas, frijoles molidos',
        ingredientes: 'carne de cerdo, chorizo, pollo, tomate, aguacate, tortilla, cebolla',
        precio: 12500,
        imagen: 'https://i.ibb.co/n0TVHt5/asado-mixto.png',
        estado: true,
        idCategoria: 3
    },
    //? Categoría 4 - Pescados
    {
        nombre: 'Mero al ajillo',
        descripcion: 'pescado blanco, con arroz blanco incluye 2 filetes pequeños y una ensalada verde',
        ingredientes: 'Mero, filetes',
        precio: 3000,
        imagen: 'https://i.ibb.co/YyTKfVZ/mero-ajillo.png',
        estado: true,
        idCategoria: 4
    },
    {
        nombre: 'Pescado Frito',
        descripcion: 'Pargo entero frito con patacones y ensalada',
        ingredientes: 'Pargo, platano verde, repollo, zanahoria, limon',
        precio: 8000,
        imagen: 'https://i.ibb.co/wRRrvg7/pescado-frito.png',
        estado: true,
        idCategoria: 4
    },
    {
        nombre: 'Pescado Empanizado',
        descripcion: 'Corvina empanizada, con pure de papas y vegetales',
        ingredientes: 'Corvina, papas, brocoli, zanahoria, mantequilla, ajo',
        precio: 7000,
        imagen: 'https://i.ibb.co/17cy0NQ/pescado-empanizado.png',
        estado: true,
        idCategoria: 4
    },
    //? Categoría 5 - Mariscos
    {
        nombre: 'Mariscada',
        descripcion: 'incluye camarones, almejas, pulpo y calamar, incluye papas fritas y ensalada verde',
        ingredientes: 'orégano, chile dulce, apio, ajo',
        precio: 4000,
        imagen: 'https://i.ibb.co/LpWqRGZ/mariscada.png',
        estado: true,
        idCategoria: 5
    },
    {
        nombre: 'Triple de Camarones',
        descripcion: 'Camarones al ajillo, empanizados y en salsa BBQ con pure de papas y vegetales',
        ingredientes: 'camarones, ajo, papas, brocoli, zanahoria, salsa BBQ',
        precio: 7500,
        imagen: 'https://i.ibb.co/w61GHrx/camarones-ajillo.png',
        estado: true,
        idCategoria: 5
    },
];