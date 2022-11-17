const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
 * GET APIs
 */

//* Todas las reservaciones
module.exports.getAllReservations = async (request, response, next) => {
  const reservations = await prismaClient.reservacion.findMany({
    include: {
      mesas: true,
      Sucursal: true,
      Usuario: true,
    },
    orderBy: {
      id: "desc"
    },
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
      mesas: true,
      Sucursal: true,
      Usuario: true,
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
      mesas: true,
      Sucursal: true,
      Usuario: true,
    },
    orderBy: {
      id: "desc"
    },
  });
  response.json(reservations);
};

//* Todas las reservaciones por usuario
module.exports.getReservationsByUser = async (request, response, next) => {
  let usuario = String(request.params.idUsuario);
  const reservations = await prismaClient.reservacion.findMany({
    where: { idUsuario: usuario },
    include: {
      mesas: true,
      Sucursal: true,
    },
    orderBy: {
      id: "desc"
    },
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
      fecha_hora: reservation.fecha_hora,
      cantidad: reservation.cantidad,
      idSucursal: reservation.idSucursal,
      idUsuario: reservation.idUsuario,
      mesas: {
        connect: reservation.mesas,
      },
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
  //* let userId= request.params.idUsuario;
  //* let sucursalId = request.params.idSucursal;

  const oldReservation = await prismaClient.reservacion.findUnique({
    where: { id: reservationId },
    include: {
      mesas: {
        select: {
          id: true,
        },
      },
    },
  });

  const updatedReservation = await prismaClient.reservacion.update({
    where: { id: reservationId },
    data: {
      fecha_hora: reservation.fecha_hora,
      cantidad: reservation.cantidad,
      idSucursal: reservation.idSucursal,
      idUsuario: reservation.idUsuario,
      mesas: {
        disconnect: oldReservation.mesas,
        connect: reservation.mesas,
      },
    },
  });
  response.json(updatedReservation);
};
