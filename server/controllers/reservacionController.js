const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            *GET APIs
*/

//Todas las reservaciones
module.exports.getAllReservations = async (request, response, next) => {
    const reservations = await prismaClient.reservacion.findMany({
        include:{
            mesas: true
        },
        orderBy:{
            fecha_hora: 'asc'  //* Debe traer las reservaciones empezando por la fecha mas cercana
                                //* No se si asi es como se debe poner el order by
        }
    });
    response.json(reservations);
};

//Todas las reservaciones por sucursal
module.exports.getReservationsBySucursal = async (request, response, next) => {
    let sucursal = request.params.idSucursal;
    const reservations = await prismaClient.reservacion.findMany({
        where:{idSucursal:sucursal},
        include:{
            mesas: true
        },
        orderBy:{
            fecha_hora: 'asc'  //* Debe traer las reservaciones empezando por la fecha mas cercana
                                //* No se si asi es como se debe poner el order by
        }
    });
    response.json(reservations);
};

//Todas las reservaciones por usuario
module.exports.getReservationsByUser = async (request, response, next) => {
    let usuario = String(request.params.idUsuario);
    const reservations = await prismaClient.reservacion.findMany({
        where:{idUsuario: usuario},
        include:{
            mesas: true
        },
        orderBy:{
            fecha_hora: 'asc'  //Debe traer las reservaciones empezando por la fecha mas cercana
                                //No se si asi es como se debe poner el order by
        }
    });
    response.json(reservations);
};