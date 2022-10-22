//* Corresponden a los distintos productos que se ofrecen (platos)

export const productos = [
    //? Categoría 1 - Bebidas
    {
        id: 1,
        nombre: 'Té frío de limón',
        descripcion: 'bebida natural',
        ingredientes: '',
        precio: 500,
        imagen: '../../../assets/images/products/bebidas/tefrio.png',
        estado: true, //* Habilitado / deshabilitado
        idCategoria: 1,
    },
    {
        id: 2,
        nombre: 'Coca Cola',
        descripcion: 'bebida gaseosa',
        ingredientes: '',
        precio: 800,
        imagen: '../../../assets/images/products/bebidas/cocacola.png',
        estado: true,
        idCategoria: 1
    },
    {
        id: 3,
        nombre: 'Café negro',
        descripcion: 'Café 1820 a gusto, incluye sobres de azúcar',
        ingredientes: '',
        precio: 750,
        imagen: '../../../assets/images/products/bebidas/cafenegro.png',
        estado: true,
        idCategoria: 1
    },
    {
        id: 4,
        nombre: 'Batido natural',
        descripcion: 'batidos de guanabana, fresa, mango y sandía',
        ingredientes: 'zumo de fruta',
        precio: 1500,
        imagen: '../../../assets/images/products/bebidas/batido.png',
        estado: true,
        idCategoria: 1
    },
    {
        id: 5,
        nombre: 'Imperial',
        descripcion: 'Cerveza',
        ingredientes: '',
        precio: 1000,
        imagen: '../../../assets/images/products/bebidas/imperial.png',
        estado: true,
        idCategoria: 1
    },
    //? Categoría 2 - Entradas
    {
        id: 5,
        nombre: 'Patacones',
        descripcion: 'plato de entrada',
        ingredientes: 'Plátano verde',
        precio: 1500,
        imagen: '../../../assets/images/products/entradas/patacones.png',
        estado: true,
        idCategoria: 2
    },
    {
        id: 6,
        nombre: 'Pinchos a la parilla',
        descripcion: 'mixto de pollo y cerdo',
        ingredientes: 'carne de res, de pollo pimentón rojo y verde',
        precio: 1200,
        imagen: '../../../assets/images/products/entradas/pinchos.png',
        estado: true,
        idCategoria: 2
    },
    {
        id: 7,
        nombre: 'Costillas BBQ',
        descripcion: 'de cerdo ahumadas con salsa BBQ incluida',
        ingredientes: '',
        precio: 2000,
        imagen: '../../../assets/images/products/entradas/costillasbbq.png',
        estado: true,
        idCategoria: 2
    },
    {
        id: 8,
        nombre: 'Papas fritas',
        descripcion: 'papas a la francesa incluye sobres de mayonesa, ketchup y mostaza',
        ingredientes: '',
        precio: 1000,
        imagen: '../../../assets/images/products/entradas/papasfritas.png',
        estado: true,
        idCategoria: 2
    },
    {
        id: 9,
        nombre: 'Dedos de Pollo',
        descripcion: 'empanizados con salsa BBQ y papas fritas',
        ingredientes: 'pollo, salsa BBQ, papas',
        precio: 1200,
        imagen: '../../../assets/images/products/entradas/dedospollo.png',
        estado: true,
        idCategoria: 2
    },
    //? Categoría 3 - Carnes
    {
        id: 10,
        nombre: 'Pincho de res',
        descripcion: '4 pinchos grandes de res',
        ingredientes: 'carne de res',
        precio: 2500,
        imagen: '../../../assets/images/products/carnes/pincho_res.png',
        estado: true,
        idCategoria: 3
    },
    {
        id: 11,
        nombre: 'New York Steak',
        descripcion: 'corte de carne New York al gusto, con papas horneadas con tocineta y queso',
        ingredientes: 'carne de res, papas, tocineta, queso',
        precio: 8500,
        imagen: '../../../assets/images/products/carnes/ny_steak.png',
        estado: true,
        idCategoria: 3
    },
    {
        id: 12,
        nombre: 'Baby Back Ribs',
        descripcion: '6 costillas en un adobo hecho a base de salsa BBQ con papas a la francesa',
        ingredientes: 'costillas de cerdo, papas',
        precio: 9500,
        imagen: '../../../assets/images/products/carnes/babybackribs.png',
        estado: true,
        idCategoria: 3
    },
    {
        id: 13,
        nombre: 'Hamburguesa CRSpits',
        descripcion: 'Hamburguesa con doble torta de carne Angus, con tocineta, doble queso, hongos salteados, salsa BBQ',
        ingredientes: 'carne Angus, tocineta, hongos, queso, salsa BBQ',
        precio: 5500,
        imagen: '../../../assets/images/products/carnes/hamburguesa.png',
        estado: true,
        idCategoria: 3
    },
    {
        id: 14,
        nombre: 'Pollo Tejano',
        descripcion: 'Pollo cocinado el horno con salsa de mostaza y BBQ, con queso derretido con hongos y tocineta encima acompañado de papas horneadas con tocineta y queso',
        ingredientes: 'pollo, salsa de mostaza, BBQ, tocineta, hongos, queso, papas',
        precio: 6500,
        imagen: '../../../assets/images/products/carnes/pollotejano.png',
        estado: true,
        idCategoria: 3
    },
    {
        id: 15,
        nombre: 'Asado Mixto',
        descripcion: 'Chuleta de Cerdo en Salsa BBQ, 3 chorizos con tortilla, pollo a la plancha, pico de gallo, guacamole, tortillas tostadas, frijoles molidos',
        ingredientes: 'carne de cerdo, chorizo, pollo, tomate, aguacate, tortilla, cebolla',
        precio: 12500,
        imagen: '../../../assets/images/products/carnes/asadomixto.png',
        estado: true,
        idCategoria: 3
    },
    //? Categoría 4 - Pescados
    {
        id: 16,
        nombre: 'Mero al ajillo',
        descripcion: 'pescado blanco, con arroz blanco incluye 2 filetes pequeños y una ensalada verde',
        ingredientes: 'Mero, filetes',
        precio: 3000,
        imagen: '../../../assets/images/products/pescados/mero_ajillo.png',
        estado: true,
        idCategoria: 4
    },
    {
        id: 17,
        nombre: 'Pescado Frito',
        descripcion: 'Pargo entero frito con patacones y ensalada',
        ingredientes: 'Pargo, platano verde, repollo, zanahoria, limon',
        precio: 8000,
        imagen: '../../../assets/images/products/pescados/pescado_entero.png',
        estado: true,
        idCategoria: 4
    },
    {
        id: 18,
        nombre: 'Pescado Empanizado',
        descripcion: 'Corvina empanizada, con pure de papas y vegetales',
        ingredientes: 'Corvina, papas, brocoli, zanahoria, mantequilla, ajo',
        precio: 7000,
        imagen: '../../../assets/images/products/pescados/pescado_empanizado.png',
        estado: true,
        idCategoria: 4
    },
    //? Categoría 5 - Mariscos
    {
        id: 19,
        nombre: 'Mariscada',
        descripcion: 'incluye camarones, almejas, pulpo y calamar, incluye papas fritas y ensalada verde',
        ingredientes: 'orégano, chile dulce, apio, ajo',
        precio: 4000,
        imagen: '../../../assets/images/products/mariscos/mariscada.png',
        estado: true,
        idCategoria: 5
    },
    {
        id: 20,
        nombre: 'Triple de Camarones',
        descripcion: 'Camarones al ajillo, empanizados y en salsa BBQ con pure de papas y vegetales',
        ingredientes: 'camarones, ajo, papas, brocoli, zanahoria, salsa BBQ',
        precio: 7500,
        imagen: '../../../assets/images/products/mariscos/triple_camarones.png',
        estado: true,
        idCategoria: 5
    },
];