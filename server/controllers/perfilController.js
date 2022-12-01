const { PrismaClient } = require("@prisma/client")

const prismaClient = new PrismaClient();

//* Obtener los diferentes tipos de Perfil
module.exports.getPerfiles = async (request, response, next) => {
    const perfiles = await prismaClient.perfil.findMany({});
    response.json(perfiles);
};

//Obtener perfil por ID
module.exports.getPerfilById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const perfil = await prismaClient.perfil.findFirst({
        where: { id : id}
    });
    return response.json(perfil);
};