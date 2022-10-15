const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            GET APIs
*/

//Todos los productos
module.exports.getAllProducts = async (request, response, next) => {
    const products = await prismaClient.producto.findMany({
        include:{
            sucursales: true
        }
    });
    response.json(products);
};

//Obtener producto por id
module.exports.getProductById = async (request, response, next) => {
    let productId = request.params.id;
    const product = await prismaClient.producto.findFirst({
        where:{id: productId},
        include:{
            sucursales:true,
        }
    });
    response.json(product);
};

//Obtener productos por categoria
module.exports.getProductsByCategory = async (request, response, next) => {
    let categoria = request.params.idCategoria;
    const products = await prismaClient.producto.findMany({
        where:{idCategoria: categoria},
        include:{
            sucursales:true,
        }
    });
    response.json(products);
};