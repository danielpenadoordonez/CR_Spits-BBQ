const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();
/*
 *GET APIs
 */
module.exports.getAllFacturas = async (request, response, next) => {
    const facturas = await prismaClient.factura_Encabezado.findMany({
        orderBy: {
            id: "asc",
        },
        include: {
            detalles: true,
            tipoPagos: true,
            TipoTarjeta: {
                select: {
                    descripcion: true,
                },
            },
        },
    });
    response.json(facturas);
};

module.exports.getFacturasByUser = async (request, response, next) => {
    let userId = request.params.idUsuario;
    const facturas = await prismaClient.factura_Encabezado.findMany({
        where: { idUsuario: userId },
        orderBy: {
            id: "asc",
        },
        include: {
            detalles: true,
            tipoPagos: true,
            TipoTarjeta: {
                select: {
                    descripcion: true,
                },
            },
        },
    });
    response.json(facturas);
};

module.exports.getFacturaById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const factura = await prismaClient.factura_Encabezado.findMany({
        where: { id: id },
        orderBy: {
            id: "asc",
        },
        include: {
            detalles: true,
            tipoPagos: true,
            TipoTarjeta: {
                select: {
                    descripcion: true,
                },
            },
        },
    });
    response.json(factura);
};


/*
* POST APIs
*/
module.exports.saveFactura = async (request, response, next) => {
    let infoFactura = request.body;
    const factura = await prismaClient.factura_Encabezado.create({
        data: {
            //El ID es autoincrement
            numero_tarjeta: infoFactura.numero_tarjeta,
            idTipoTarjeta: infoFactura.idTipoTarjeta,
            fecha: infoFactura.fecha !== undefined ? new Date(infoFactura.fecha) : infoFactura.fecha,
            estado: infoFactura.estado,
            direccion: infoFactura.direccion,
            idUsuario: infoFactura.idUsuario,
            detalles: {
                createMany: {
                    data: infoFactura.detalles,
                },
                skipDuplicates: true //* Evito problemas
            },
            tipoPagos: {
                createMany: {
                    data: infoFactura.tipoPagos,
                },
                skipDuplicates: true
            },
        },
    });

    response.json(factura);
}
