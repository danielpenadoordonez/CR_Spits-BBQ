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
      sucursales_producto: {
        include: {
          Sucursal: true,
        }
      },
    },
  });
  response.json(products);
};

//* Obtener producto por id
module.exports.getProductById = async (request, response, next) => {
  let productId = parseInt(request.params.id);
  const product = await prismaClient.producto.findFirst({
    where: { id: productId },
    include: {
      sucursales_producto: {
        include: {
          Sucursal: true,
        }
      },
      Categoria_Producto: true,
    },
  });
  response.json(product);
};

//* Obtener productos por categoria
module.exports.getProductsByCategory = async (request, response, next) => {
  let categoria = parseInt(request.params.idCategoria);
  const products = await prismaClient.producto.findMany({
    where: { idCategoria: categoria },
    include: {
      sucursales_producto: true,
    },
  });
  response.json(products);
};

//* Obtener productos por idSucursal (Muchos a Muchos)
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
  products = await Promise.all(products.map(getProductInfo));
  setTimeout(() => {
    response.json(products);
  }, 100);
};

/*
 *POST APIs
 */
module.exports.createProduct = async (request, response, next) => {
  let product = request.body;
  const newProduct = await prismaClient.producto.create({
    data: {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      ingredientes: product.ingredientes,
      precio: product.precio,
      imagen: product.imagen,
      estado: product.estado,
      idCategoria: product.idCategoria,
      sucursales_producto: {
        //Tiene que ser {id:valor}
        connect: product.sucursales_producto
      },
    },
  });
  response.json(newProduct);
}

/*
 *  PUT APIs
 */
module.exports.updateProduct = async (request, response, next) => {
  let product = request.body;
  let productId = parseInt(request.params.id);
  
  //Producto viejo
  const oldProduct = await prismaClient.producto.findUnique({
    where: {id: productId},
    include: {
      sucursales_producto: {
        select: {
          idProducto: true,
          idSucursal: true
        }
      }
    }
  });
  
  const updatedProduct = await prismaClient.producto.update({
    where: {id: productId},
    data: {
      nombre: product.nombre,
      descripcion: product.descripcion,
      ingredientes: product.ingredientes,
      precio: product.precio,
      imagen: product.imagen,
      estado: product.estado,
      idCategoria: product.idCategoria,
      sucursales_producto: {
        //Tiene que ser {id:valor}
        disconnect: oldProduct.sucursales_producto,
        connect: product.sucursales_producto
      }
    }
  });
  response.json(updatedProduct);
}
