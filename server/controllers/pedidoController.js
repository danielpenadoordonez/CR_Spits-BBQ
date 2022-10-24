const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
   *GET APIs
 */

//Todos los pedidos
module.exports.getAllPedidos = async (request, response, next) => {
  const pedidos = await prismaClient.pedido.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      detalles: true,
    },
  });

  response.json(pedidos);
};

//* Pedido por id
module.exports.getPedidoById = async (request, response, next) => {
  let id = Number(request.params.id);
  const pedido = await prismaClient.pedido.findFirst({
    where: { id: id },
    orderBy: {
      id: "desc",
    },
    include: {
      detalles: true,
    },
  });

  response.json(pedido);
};

//* Pedidos por usuario
module.exports.getPedidosByUsuario = async (request, response, next) => {
  let user = String(request.params.idUsuario);
  const pedidos = await prismaClient.pedido.findMany({
    where: { idCliente: user },
    orderBy: {
      id: "desc",
    },
    include: {
      detalles: true,
    },
  });

  response.json(pedidos);
};
