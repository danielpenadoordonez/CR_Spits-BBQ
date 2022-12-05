const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
 *  GET APIs
 */

//* Todos los detalles
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

/*
 *  POST APIs
 */

//* Crea varios detalles...
module.exports.createDetail = async (request, response, next) => {
  let details = request.body;
  const newDetails = await prismaClient.pedido_Producto.createMany({
    data: details, //* Tiene que venir con el formato - en el postman
    skipDuplicates: true, //* Evita los duplicados
  });

  response.json(newDetails); //* Retorna la cantidad de archivos creados...
};

/*
 *  PUT APIs
 */
module.exports.updateDetail = async (request, response, next) => {
  let detail = request.body;
  let idPedido = parseInt(request.params.idPedido);
  let idProducto = parseInt(request.params.idProducto);
  const updatedDetail = await prismaClient.pedido_Producto.update({
    where: { idPedido: idPedido, idProducto: idProducto },
    data: {
      cantidad: detail.cantidad,
      notas: detail.notas,
    },
  });
  response.json(updatedDetail);
};
