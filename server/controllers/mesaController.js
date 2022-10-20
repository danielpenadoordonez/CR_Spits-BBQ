const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
 *GET APIs
 */

//* Todas las mesas - Get con un bigint
module.exports.getAllMesas = async (request, response, next) => {
  const mesas = await prismaClient.mesa.findMany({
    orderBy: {
      codigo: "asc",
    },
  });

  let respuesta = JSON.stringify(mesas, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
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

  let respuesta = JSON.stringify(mesa, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};

//* Obtener mesas por Disponibilidad
module.exports.getMesasByDisponibilidad = async (request, response, next) => {
  let disponibilidad = request.params.idDisponibilidad;
  const mesas = await prismaClient.mesa.findMany({
    where: { idDisponibilidad: disponibilidad },
    include: {
      reservaciones: true,
    },
  });

  let respuesta = JSON.stringify(mesas, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};

//* Obtener mesa por Sucursal
module.exports.getMesasBySucursal = async (request, response, next) => {
  let sucursal = request.params.idSucursal;
  const mesas = await prismaClient.mesa.findMany({
    where: { idSucursal: sucursal },
    include: {
      reservaciones: true,
    },
  });

  let respuesta = JSON.stringify(mesas, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};

//* Obtener mesa por Sucursal y Disponibilidad
module.exports.getMesasBySucursalandDisp = async (request, response, next) => {
  let sucursal = request.params.idSucursal;
  let disponibilidad = request.params.idDisponibilidad;
  const mesas = await prismaClient.mesa.findMany({
    where: { idSucursal: sucursal, idDisponibilidad: disponibilidad },
    include: {
      reservaciones: true,
    },
  });

  let respuesta = JSON.stringify(mesas, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  response.json(JSON.parse(respuesta));
};
