const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            GET APIs
*/

//Obtener las Disponibilidades que puede tener una mesa
module.exports.getDisponibilidadesMesas = async (request, response, next) => {
    const disponibilidades = await prismaClient.disponibilidadMesa.findMany({});
    response.json(disponibilidades);
};