const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
 *GET APIs
 */

//Todos los usuarios
module.exports.getAllUsers = async (request, response, next) => {
  const users = await prismaClient.usuario.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(users);
};

//* Obtener usuario por ID
module.exports.getUserById = async (request, response, next) => {
  let id = String(request.params.id);
  const user = await prismaClient.usuario.findUnique({
    where: { id: id },
    include: {
      reservaciones: true,
      pedidos: true,
      Perfil: true,
    },
  });
  response.json(user);
};

//* Obtener usuarios por id perfil
module.exports.getUsersByProfile = async (request, response, next) => {
  let perfil = parseInt(request.params.idPerfil);
  const users = await prismaClient.usuario.findMany({
    where: { idPerfil: perfil },
    include: {
      reservaciones: true,
      pedidos: true,
    },
  });
  response.json(users);
};

//* Obtener usuario por username
module.exports.getUserByUserName = async (request, response, next) => {
  let username = String(request.params.username);
  const user = await prismaClient.usuario.findFirst({
    where: { username: username },
    include: {
      reservaciones: true,
      pedidos: true,
    },
  });
  response.json(user);
};

//* Obtener usuario por correo
module.exports.getUserByEmail = async (request, response, next) => {
  let email = request.params.correo; //? Correo NO necesita cast a string, da error
  const user = await prismaClient.usuario.findFirst({
    where: { correo: email },
    include: {
      reservaciones: true,
      pedidos: true,
    },
  });
  response.json(user);
};
