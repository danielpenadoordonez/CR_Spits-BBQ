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
      productos: true,
    },
  });

  let respuesta = JSON.stringify(pedidos, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
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
      productos: true,
    },
  });

  let respuesta = JSON.stringify(pedido, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};

//* Pedidos por usuario
module.exports.getPedidosByUsuario = async (request, response, next) => {
  let user = String(request.params.idUsuario);
  const pedidos = await prismaClient.pedido.findMany({
    where: { idUsuario: user },
    orderBy: {
      id: "desc",
    },
    include: {
      productos: true,
    },
  });

  let respuesta = JSON.stringify(pedidos, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};
