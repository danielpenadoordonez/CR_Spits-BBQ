const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            *GET APIs
*/

//Obtener las Disponibilidades que puede tener una mesa
module.exports.getEstadosPedidos = async (request, response, next) => {
    const estados = await prismaClient.estadoPedido.findMany({});
    response.json(estados);
};