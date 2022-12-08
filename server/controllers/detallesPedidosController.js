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
  let data = request.body;
  const newDetails = await prismaClient.pedido_Producto.createMany({
    data: data.detalles, //* Tiene que venir con el formato - en el postman
    skipDuplicates: true, //* Evita los duplicados
  });

  if (data.codigoMesa != undefined && data.codigoMesa != null && data.codigoMesa != "") {
    //* Cuando sea diferente de online
    const mesaActualizada = await prismaClient.mesa.update({
      where: { codigo: data.codigoMesa },
      data: {
        idDisponibilidad: 1, //* Setea libre
      },
    });
  }

  const pedidoActualizado = await prismaClient.pedido.update({
    where: { id: parseInt(data.idPedido) },
    data: {
      precio: parseInt(data.precio), //* Setea el precio
    },
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
