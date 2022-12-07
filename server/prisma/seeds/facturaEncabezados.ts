//* Seeds de factura para trabajar
//* Tanto el tipo de tarjeta como el número son campos opcionales, digo en caso de que seleccione otro tipo de pago
//* Igual fecha puede tener default

export const facturaEncabezados = [
    //* 1
    {
        numero_tarjeta: "4301861302107407",
        idTipoTarjeta: 1, //* Visa
        fecha: new Date("2022-11-13"),
        estado: true,
        direccion: "San Jose, Central Desamparados",
        idUsuario: "65440685802"
    },
    //* 2
    {
        numero_tarjeta: "371823874705705",
        idTipoTarjeta: 3, //* American Express
        fecha: new Date("2022-11-14"),
        estado: true,
        direccion: "Garabito, Jaco",
        idUsuario: "167459042"
    },
    //* 3
    {
        numero_tarjeta: "5440534544222347",
        idTipoTarjeta: 2, //* Master Card
        fecha: new Date("2022-11-14"),
        estado: true,
        direccion: "100 Norte de Cocorisa, Lagunilla, Heredia",
        idUsuario: "167459042"
    },
    //* 4
    {
        numero_tarjeta: "6011422780184016",
        idTipoTarjeta: 5, //* Discover
        estado: true,
        direccion: "Palmares, Central Palmares",
        idUsuario: "508459062"
    },
    //* 5
    {
        numero_tarjeta: "3560895222251588",
        idTipoTarjeta: 4, //* JCB
        estado: true,
        direccion: "Central, Mata Redonda",
        idUsuario: "167459042"
    },
    //* 6
    {
        numero_tarjeta: "4855007854071258",
        idTipoTarjeta: 1, //* Visa
        estado: true,
        direccion: "San Jose, Central Desamparados",
        idUsuario: "508459062"
    },
    //* 7
    {
        numero_tarjeta: "374376873804172",
        idTipoTarjeta: 1, //* America Express
        estado: true,
        direccion: "San Jose, Montes De Oca",
        idUsuario: "206450674"
    },
];