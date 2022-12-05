const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();
const pedidoService = require("../services/PedidoService");

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
      EstadoPedido: true,
      Cliente: true,
      Mesero: true,
      Mesa: true,
      Sucursal: true,
      TipoPedido: {
        select: {
          descripcion: true,
        },
      },
    },
  });
  response.json(pedidos);
};

//* Pedido por id
module.exports.getPedidoById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prismaClient.pedido.findFirst({
    where: { id: id },
    include: {
      detalles: {
        include: {
          Producto: true,
        },
      },
      EstadoPedido: true,
      Cliente: true,
      Mesero: true,
      Mesa: true,
      Sucursal: true,
      TipoPedido: {
        select: {
          descripcion: true,
        },
      },
    },
  });
  response.json(pedido);
};

//* Pedidos por usuario - Filtro
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

//* Obtener pedidos por sucursal - Filtro
module.exports.getPedidosByIdSucursal = async (request, response, next) => {
  let sucursal = parseInt(request.params.idSucursal);
  const pedidos = await prismaClient.pedido.findMany({
    where: { idSucursal: sucursal },
    orderBy: {
      id: "asc", //* Orden claro que sí
    },
    include: {
      detalles: true,
      EstadoPedido: true,
      Cliente: true,
      Mesero: true,
      Mesa: true,
    },
  });
  response.json(pedidos);
};

//* Obtener pedidos por estado - Filtro
module.exports.getPedidosByState = async (request, response, next) => {
  let estado = parseInt(request.params.idEstado);
  const pedidos = await prismaClient.pedido.findMany({
    where: { idEstado: estado },
    orderBy: {
      id: "asc", //* Orden claro que sí
    },
    include: {
      detalles: true,
      EstadoPedido: true,
      Cliente: true,
      Mesero: true,
      Mesa: true,
      Sucursal: true,
      TipoPedido: true,
    },
  });
  response.json(pedidos);
};

/*
 * POST APIs
 */
module.exports.registerPedido = async (request, response, next) => {
  let pedido = request.body;

  //* Se obtienen todos los pedidos de la sucusal
  const allPedidos = await prismaClient.pedido.findMany({
    where: { idSucursal: pedido.idSucursal },
  });

  //* Generar un nuevo codigo de pedido
  let previousNum = pedidoService.getPreviousNumber(allPedidos);
  let nombrePedido = pedidoService.generateNombrePedido(
    pedido.idSucursal,
    previousNum
  );

  const newPedido = await prismaClient.pedido.create({
    data: {
      //* NO VA EL ID, ES UN AUTOINCREMENT
      nombre: nombrePedido,
      fecha: pedido.fecha !== undefined ? new Date(pedido.fecha) : pedido.fecha, //! LO MÁS NORMAL ES QUE VENGA VACÍO, YA QUE LA FECHA POR DEFAULT SE COLOCA ESE DÍA
      precio: pedido.precio,
      idEstado: pedido.idEstado,
      idCliente: pedido.idCliente,
      idMesero: pedido.idMesero,
      idSucursal: pedido.idSucursal,
      idMesa: pedido.idMesa,
      idTipoPedido: pedido.idTipoPedido,
      detalles: {
        createMany: {
          data: pedido.detalles,
        },
      },
    },
  });

  if (pedido.idTipoPedido != 2) { //* Cuando sea diferente de online
    const mesaActualizada = await prismaClient.mesa.update({
      where: { id: pedido.idMesa },
      data: {
        idDisponibilidad: 3, //* Setea ocupada
      },
    });
  }

  response.status(200).json({
    status: true,
    message: `Pedido ${nombrePedido} registrado`,
    data: newPedido,
  });
};


/*
* PUT APIs
*/ 
module.exports.updatePedido = async (request, response, next) => {
  let idPedido = request.params.id;
  let orden = request.body;
  const pedido = await prismaClient.pedido.update({
    where: { id: idPedido},
    data: {
      idEstado: orden.idEstado
    },
  });
  return response.json(pedido);
}