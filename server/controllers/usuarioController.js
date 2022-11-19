const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();
const userService = require("../services/UserService");

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

/*
 * POST APIs
 */
module.exports.createUser = async (request, response, next) => {
  let user = request.body;
  //Se encripta el password
  let hashedPassword = userService.generateEncryptedPassword(user.clave);
  const newUser = await prismaClient.usuario.create({
    data: {
      id: user.id,
      nombre: user.nombre,
      apellido1: user.apellido1,
      apellido2: user.apellido2,
      correo: user.correo,
      username: user.username,
      clave: hashedPassword,
      telefono: user.telefono,
      direccion: user.direccion,
      idPerfil: user.idPerfil,
      reservaciones: {
        connect: user.reservaciones
      },
      facturas: {
        connect: user.facturas
      },
      pedidos: {
        connect: user.pedidos
      },
      encargos: {
        connect: user.encargos
      },
      sucursales: {
        connect: user.sucursales
      },
    },
  });
  response.status(200).json({
    status: true,
    message: `Usuario ${user.username} registrado`,
    data: newUser
  });
}

/*
 *  PUT APIs
 */
module.exports.updateUser = async (request, response, next) => {
  let user = request.body;
  let userId = String(request.params.id);

  const oldUser = await prismaClient.usuario.findUnique({
    where: { id : userId},
    include: {
      sucursales: {
        select: {
          id: true
        },
      },
    },
  });

  const updatedUser = await prismaClient.usuario.update({
    where: { id: userId},
    data: {
      nombre: user.nombre,
      apellido1: user.apellido1,
      apellido2: user.apellido2,
      correo: user.correo,
      username: user.username,
      telefono: user.telefono,
      direccion: user.direccion,
      idPerfil: user.idPerfil,
      sucursales: {
        disconnect: oldUser.sucursales,
        connect: user.sucursales,
      }
    },
  });

  response.status(200).json({
    status: true,
    message: `Usuario ${user.username} actualizado`,
    data: updatedUser
  });
}

module.exports.updatePassword = async (request, response, next) => {
  userId = String(request.params.id);
  data = request.body;
  currentPassword = data.currentPassword;
  newPassword = data.newPassword;

  //Se obtiene el usuario para el que se desea modificar el password
  const user = await prismaClient.usuario.findUnique({
    where: { id: userId },
  });
  
  //Si el usuario ingresa su password actual correcto entonces lo puede modificar
  if(userService.isPasswordCorrect(currentPassword, user.clave)){
    //Se encripta el password nuevo
    let hashedPassword = userService.generateEncryptedPassword(newPassword);
    const updatedUser = await prismaClient.usuario.update({
      where: { id: userId},
      data: {
        clave: hashedPassword
      },
    });
    response.status(200).json({
      status: true,
      message: `Password para ${user.username} actualizado`,
      data: updatedUser
    });
  }
  else{
    response.status(401).json({
      success: false,
      message: `Password incorrecto`,
    });
  }
}