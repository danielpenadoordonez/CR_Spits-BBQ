const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            GET APIs
*/

//Todos los productos
module.exports.getAllProducts = async (request, response, next) => {
  const products = await prismaClient.producto.findMany({
    include: {
      sucursales: true,
    },
  });

  let respuesta = JSON.stringify(products, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};

//* Obtener producto por id
module.exports.getProductById = async (request, response, next) => {
  let productId = request.params.id;
  const product = await prismaClient.producto.findFirst({
    where: { id: productId },
    include: {
      sucursales: true,
    },
  });

  let respuesta = JSON.stringify(product, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};

//* Obtener productos por categoria
module.exports.getProductsByCategory = async (request, response, next) => {
  let categoria = request.params.idCategoria;
  const products = await prismaClient.producto.findMany({
    where: { idCategoria: categoria },
    include: {
      sucursales: true,
    },
  });

  let respuesta = JSON.stringify(products, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};
