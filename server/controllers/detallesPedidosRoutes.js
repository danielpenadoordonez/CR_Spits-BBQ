const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
 *GET APIs
 */

//* Todos los detalles (algo un tanto inútil en mi opinión)
module.exports.getAllDetallesPedidos = async (request, response, next) => {
  const detalles = await prismaClient.pedido_Producto.findMany({
    orderBy: {
      idPedido: "desc",
    },
  });

  response.json(detalles);
};

//* Obtener todos los detalles de una orden por el id
module.exports.getDetallesByPedidoId = async (request, response, next) => {
  let idPedido = parseInt(request.params.id);
  const detalles = await prismaClient.pedido_Producto.findMany({
    where: { idPedido: idPedido },
  });

  response.json(detalles);
};
