const { PrismaClient } = require("@prisma/client");
const { parse } = require("path");
const { stringify } = require("querystring");
const { json } = require("stream/consumers");

const prismaClient = new PrismaClient();

/*
 * GET APIs
 */

//Todos los productos
module.exports.getAllProducts = async (request, response, next) => {
  const products = await prismaClient.producto.findMany({
    include: {
      sucursales_producto: true,
    },
  });

  response.json(products);
};

// Obtener producto por id
module.exports.getProductById = async (request, response, next) => {
  let productId = parseInt(request.params.id);
  const product = await prismaClient.producto.findFirst({
    where: { id: productId },
    include: {
      sucursales_producto: true,
    },
  });

  response.json(product);
};

// Obtener productos por categoria
module.exports.getProductsByCategory = async (request, response, next) => {
  let categoria = request.params.idCategoria;
  const products = await prismaClient.producto.findMany({
    where: { idCategoria: categoria },
    include: {
      sucursales_producto: true,
    },
  });

  response.json(products);
};

//* Obtener productos por Sucursal (Muchos a Muchos)
module.exports.getProductsBySucursal = async (request, response, next) => {
  let sucursal = parseInt(request.params.idSucursal);
  //Se trae todos los productos en esa sucursal
  let products = await prismaClient.sucursal_Producto.findMany({
    where: { idSucursal: sucursal },
  });

  //* Por cada producto se trae toda su informacion de la tabla producto

  async function getProductInfo(product) {
    let prodID = parseInt(product.idProducto);
    let producto = await prismaClient.producto.findFirst({
      where: { id: prodID },
      include: {
        sucursales_producto: true,
      },
    });
    return producto;
  }

  let answer = products.map(getProductInfo);

  setTimeout(() => {
    console.log(answer);
    console.log('respuesta');
    response.json(answer);
  }, 100);
};
