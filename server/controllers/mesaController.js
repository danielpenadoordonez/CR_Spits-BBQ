const { PrismaClient } = require("@prisma/client");
//const TableService = require("../services/tableService");

const prismaClient = new PrismaClient();
const tableService = require("../services/TableService");

/*
 *GET APIs
 */

//* Todas las mesas
module.exports.getAllMesas = async (request, response, next) => {
  const mesas = await prismaClient.mesa.findMany({
    orderBy: {
      idSucursal: "asc",
    },
    include: {
      Sucursal: true,
      EstadoMesa: true,
    },
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

/*
  *POST APIs
 */
module.exports.createTable = async (request, response, next) => {
  let table = request.body;

  //Se obtienen todas las mesas de la sucursal en la que se quiere agregar la nueva mesa
  const allMesas = await prismaClient.mesa.findMany({
    where: { idSucursal: table.idSucursal },
  });

  //Logica para generar un nuevo codigo de mesa
  let previousNum = tableService.getPreviousNumber(allMesas);
  let tableCode = tableService.generateTableCode(table.idSucursal, previousNum);

  const newTable = await prismaClient.mesa.create({
    data: {
      codigo: tableCode,
      capacidad: table.capacidad,
      estado: table.estado,
      idSucursal: table.idSucursal,
      idDisponibilidad: table.idDisponibilidad,
    },
  });
  response.json(newTable);
};

/*
  *  PUT APIs
 */

module.exports.updateTable = async (request, response, next) => {
  let table = request.body;
  let tableCode = String(request.params.codigo);
  //let tableCode = table.codigo;
  const updatedTable = await prismaClient.mesa.update({
    where: { codigo: tableCode },
    data: {
      capacidad: table.capacidad,
      estado: table.estado,
      idDisponibilidad: table.idDisponibilidad,
    },
  });
  response.json(updatedTable);
};
