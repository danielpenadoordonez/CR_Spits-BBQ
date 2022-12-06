const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();
const reservationService = require("../services/ReservacionService");
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
      Sucursal: true,
      Mesa: true,
      Usuario: true,
    },
    orderBy: [{ id: "desc" }, { codigo: "desc" }],
  });
  response.json(reservations);
};

//* Todas las reservacion por codigo
module.exports.getReservationByCode = async (request, response, next) => {
  let codigoReserva = String(request.params.codigo);
  const reservation = await prismaClient.reservacion.findFirst({
    where: { codigo: codigoReserva },
    include: {
      Mesa: true,
      Sucursal: true,
    },
    orderBy: [{ id: "desc" }, { codigo: "desc" }],
  });
  response.json(reservation);
};

/*
 *POST APIs
 */
module.exports.createReservation = async (request, response, next) => {
  let reservation = request.body;

  //* Obtiene todos las reservacion por Sucursal
  const allReservations = await prismaClient.reservacion.findMany({
    where: { idSucursal: reservation.idSucursal },
  });

  //* Crear codigo de reservacion
  let previousNum = reservationService.getPreviousNumber(allReservations);
  let reservationCode = reservationService.generateReservacionCode(
    reservation.idSucursal,
    previousNum
  );

  const newReservation = await prismaClient.reservacion.create({
    data: {
      codigo: reservationCode,
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

  //* Actualizamos el estado de la mesa
  const mesaActualizar = await prismaClient.mesa.update({
    where: { id: reservation.idMesa },
    data: {
      idDisponibilidad: 2, //* Reservada
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
      cantidad: parseInt(reservation.cantidad),
    },
  });
  response.json(updatedReservation);
};
