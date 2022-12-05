//? es autoincrement, no ocupo el id
//? la fecha_hora tiene default, sino se coloca nada

//* Reservaciones con relación 1:N

export const reservaciones = [
    {
        codigo: "CRSB-01-1",
        fecha_hora: new Date('2022-11-5'),
        cantidad: 5,
        idSucursal: 1,
        idUsuario: "508459062",
        idMesa: 5
    },
    {
        codigo: "CRSB-02-1",
        fecha_hora: new Date('2022-11-6'),
        cantidad: 4,
        idSucursal: 2,
        idUsuario: "206450674",
        idMesa: 13
    },
    {
        codigo: "CRSB-01-2",
        fecha_hora: new Date('2022-11-8'),
        cantidad: 2,
        idSucursal: 1,
        idUsuario: "508459062",
        idMesa: 7
    },
    {
        codigo: "CRSB-03-1",
        fecha_hora: new Date('2022-11-9'),
        cantidad: 4,
        idSucursal: 3,
        idUsuario: "167459042",
        idMesa: 26
    },
    {
        codigo: "CRSB-02-2",
        fecha_hora: new Date('2022-11-11'),
        cantidad: 6,
        idSucursal: 2,
        idUsuario: "206450674",
        idMesa: 14
    },
    {
        codigo: "CRSB-04-1",
        fecha_hora: new Date('2022-11-13'),
        cantidad: 5,
        idSucursal: 4,
        idUsuario: "65440685802",
        idMesa: 38
    }
];
