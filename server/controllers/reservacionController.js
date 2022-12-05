const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
 * GET APIs
 */

//* Todas las reservaciones
module.exports.getAllReservations = async (request, response, next) => {
  const reservations = await prismaClient.reservacion.findMany({
    include: {
      Sucursal: true,
      Usuario: true,
      Mesa: true,
    },
    orderBy: [{ id: "desc" }, { codigo: "desc" }],
  });
  response.json(reservations);
};

//* Obtener reservación by id
module.exports.getReservationById = async (request, response, next) => {
  console.log("hola");
  let idReservacion = parseInt(request.params.id);
  const reservation = await prismaClient.reservacion.findFirst({
    where: { id: idReservacion },
    include: {
      Sucursal: true,
      Usuario: true,
      Mesa: true,
    },
  });
  response.json(reservation);
};

//* Todas las reservaciones por sucursal
module.exports.getReservationsBySucursal = async (request, response, next) => {
  let sucursal = parseInt(request.params.idSucursal);
  const reservations = await prismaClient.reservacion.findMany({
    where: { idSucursal: sucursal },
    include: {
      Sucursal: true,
      Usuario: true,
      Mesa: true,
    },
    orderBy: [{ id: "desc" }, { codigo: "desc" }],
  });
  response.json(reservations);
};

//* Todas las reservaciones por usuario
module.exports.getReservationsByUser = async (request, response, next) => {
  let usuario = String(request.params.idUsuario);
  const reservations = await prismaClient.reservacion.findMany({
    where: { idUsuario: usuario },
    include: {
      Mesa: true,
      Sucursal: true,
    },
    orderBy: [{ id: "desc" }, { codigo: "desc" }],
  });
  response.json(reservations);
};

/*
 *POST APIs
 */
module.exports.createReservation = async (request, response, next) => {
  let reservation = request.body;
  const newReservation = await prismaClient.reservacion.create({
    data: {
      codigo: "test1", 
      fecha_hora:
        reservation.fecha_hora !== undefined
          ? new Date(reservation.fecha_hora)
          : reservation.fecha_hora,
      cantidad: parseInt(reservation.cantidad),
      idSucursal: reservation.idSucursal,
      idUsuario: reservation.idUsuario,
      idMesa: reservation.idMesa,
    },
  });
  response.json(newReservation);
};

/*
 *  PUT APIs
 */
module.exports.updateReservation = async (request, response, next) => {
  let reservation = request.body;
  let reservationId = parseInt(request.params.id);

  const updatedReservation = await prismaClient.reservacion.update({
    where: { id: reservationId },
    data: {
      //* Solo estos campos se actualizan
      fecha_hora: reservation.fecha_hora,
      cantidad: reservation.cantidad,
      idUsuario: reservation.idUsuario,
    },
  });
  response.json(updatedReservation);
};
