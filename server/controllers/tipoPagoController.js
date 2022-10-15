const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            GET APIs
*/

//Obtener los tipos de pago
module.exports.getTiposPago = async (request, response, next) => {
    const tiposPago = await prismaClient.tipoPago.findMany({});
    response.json(tiposPago);
};