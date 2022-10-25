const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
 *GET APIs
 */

//* Todas las mesas
module.exports.getAllMesas = async (request, response, next) => {
  const mesas = await prismaClient.mesa.findMany({
    orderBy: {
      idSucursal: "asc"
    },
    include: {
      Sucursal: true,
      EstadoMesa: true,
    }
  });

  response.json(mesas);
};

//* Obtener mesa por el id
module.exports.getMesaById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prismaClient.mesa.findFirst({
    where: { id: id },
    include: {
      reservaciones: true,
      Sucursal: true,
      EstadoMesa: true,
    },
  });

  response.json(mesa);
};

//* Obtener mesa por Codigo
module.exports.getMesaByCode = async (request, response, next) => {
  let code = String(request.params.codigo);
  const mesa = await prismaClient.mesa.findFirst({
    where: { codigo: code },
    include: {
      reservaciones: true,
    },
  });

  response.json(mesa);
};

//* Obtener mesas por Disponibilidad
module.exports.getMesasByDisponibilidad = async (request, response, next) => {
  let disponibilidad = parseInt(request.params.idDisponibilidad);
  const mesas = await prismaClient.mesa.findMany({
    where: { idDisponibilidad: disponibilidad },
    include: {
      reservaciones: true,
    },
  });

  response.json(mesas);
};

//* Obtener mesa por Sucursal
module.exports.getMesasBySucursal = async (request, response, next) => {
  let sucursal = parseInt(request.params.idSucursal);
  const mesas = await prismaClient.mesa.findMany({
    where: { idSucursal: sucursal },
    include: {
      reservaciones: true,
    },
  });

  response.json(mesas);
};

//* Obtener mesa por Sucursal y Disponibilidad
module.exports.getMesasBySucursalandDisp = async (request, response, next) => {
  let sucursal = parseInt(request.params.idSucursal);
  let disponibilidad = parseInt(request.params.idDisponibilidad);
  const mesas = await prismaClient.mesa.findMany({
    where: { idSucursal: sucursal, idDisponibilidad: disponibilidad },
    include: {
      reservaciones: true,
    },
  });

  response.json(mesas);
};
