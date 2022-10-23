const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            *GET APIs
*/

//Obtener las categorias que puede tener un producto
module.exports.getCategoriasProd = async (request, response, next) => {
    const categorias = await prismaClient.categoria_Producto.findMany({});
    response.json(categorias);
};