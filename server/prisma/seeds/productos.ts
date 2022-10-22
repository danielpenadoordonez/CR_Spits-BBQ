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
        descripcion: 'Café 1820 a gusto, incluye el sobres de azúcar',
        ingredientes: '',
        precio: 750,
        imagen: '../../../assets/images/products/bebidas/cafenegro.png',
        estado: true,
        idCategoria: 1
    },
    {
        id: 4,
        nombre: 'Batido natural',
        descripcion: 'batodos de guanabana, fresa, mango y sandía',
        ingredientes: 'zumo de fruta',
        precio: 1500,
        imagen: '../../../assets/images/products/bebidas/batido.png',
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
        nombre: 'Papas fritas',
        descripcion: 'papas a la francesa incluye sobres de mayonesa, ketchup y mostaza',
        ingredientes: 'papas',
        precio: 1000,
        imagen: '../../../assets/images/products/entradas/papasfritas.png',
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
    //! Faltan, en desarrollo
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
    //! Faltan, en desarrollo
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
    //! Faltan, en desarrollo
];