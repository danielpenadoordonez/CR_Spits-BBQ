const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            *GET APIs
*/

//* Obtener los tipos de pedido
module.exports.getTiposPedido = async (request, response, next) => {
    const tiposPago = await prismaClient.tipoPedido.findMany({});
    response.json(tiposPago);
};