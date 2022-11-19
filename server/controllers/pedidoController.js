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
      TipoPedido: true
    },
  });
  response.json(pedidos);
};

/*
 * POST APIs
 */
module.exports.registerPedido = async (request, response, next) => {
  let pedido = request.body;
  const newPedido = await prismaClient.pedido.create({
    id: pedido.id,
    nombre: pedido.nombre,
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
  });
  response.status(200).json({
    status: true,
    message: `Pedido ${pedido.id} registrado`,
    data: newPedido
  });
}
