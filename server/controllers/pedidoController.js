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
      estadoPedido: true,
      Cliente: true,
      Mesero: true,
      Mesa: true
    },
  });

  response.json(pedidos);
};

//* Pedido por id
module.exports.getPedidoById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prismaClient.pedido.findFirst({
    where: { id: id },
    orderBy: {
      id: "desc",
    },
    include: {
      detalles: {
        include: {
          Producto: true,
        }
      },
      Cliente: true,
      Mesero: true,
      estadoPedido: true,
      Mesa: true,
      Sucursal: true,
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
