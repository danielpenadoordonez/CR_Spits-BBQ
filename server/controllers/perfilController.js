const { PrismaClient } = require("@prisma/client")

const prismaClient = new PrismaClient();

//* Obtener los diferentes tipos de Perfil
module.exports.getPerfiles = async (request, response, next) => {
    const perfiles = await prismaClient.perfil.findMany({});
    response.json(perfiles);
};