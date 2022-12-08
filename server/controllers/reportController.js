const { PrismaClient, Prisma, } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.ventasPorFecha = async (request, response, next) => {
    //* Casteo los parámetros
    let fechaInicio = request.body.fechaInicio;
    let fechaCierre = request.body.fechaCierre;

    if (fechaInicio !== undefined) {
        if (fechaCierre === undefined) {
            //* Si no viene la fecha de cierre entonces se toma la fecha actual
            fechaCierre = getCurrentDate();
        }
        //* Cantidad de productos vendidos x fecha
        const reportData = await prisma.$queryRaw(
            Prisma.sql`SELECT SUM(p.id) as cantidadProductos, p.fecha
                        FROM Pedido p, Sucursal s, TipoPedido tp, EstadoPedido ep 
                        WHERE fecha BETWEEN ${fechaInicio} AND ${fechaCierre} AND p.idSucursal = s.id AND p.idTipoPedido = tp.id AND p.idTipoPedido = 1 AND p.idEstado = ep.id AND p.idTipoPedido = 1 AND p.idEstado = ep.id
                        GROUP BY p.fecha;`
        );
        response.json(reportData);
    }
    else {
        //* Si no se especifican fechas entonces por defecto se busca por la fecha actual
        let currentDate = getCurrentDate();
        const reportData = await prisma.$queryRaw(
            Prisma.sql`SELECT SUM(p.id) as cantidadProductos, p.fecha
                        FROM Pedido p, Sucursal s, TipoPedido tp, EstadoPedido ep 
                        WHERE fecha = ${currentDate} AND p.idSucursal = s.id AND p.idTipoPedido = tp.id AND p.idTipoPedido = 1 AND p.idEstado = ep.id AND p.idTipoPedido = 1 AND p.idEstado = ep.id
                        GROUP BY p.fecha;`
        );
        response.json(reportData);
    }
}


module.exports.ventasPorMedioPago = async (request, response, next) => {
    //* Casteo los parámetros
    let fechaInicio = request.body.fechaInicio;
    let fechaCierre = request.body.fechaCierre;
    let idTipoPago = request.body.idTipoPago;

    if (fechaInicio !== undefined) {
        if (fechaCierre === undefined) {
            //* Si no viene la fecha de cierre entonces se toma la fecha actual
            fechaCierre = getCurrentDate();
        }
        //* Cantidad de productos vendidos x fecha
        const reportData = await prisma.$queryRaw(
            Prisma.sql`SELECT t.descripcion as MetodoDePago, SUM(fd.precio) as Cantidad
                        FROM TipoPago t, FacturaEncabezadoTipoPago f, Factura_Encabezado fe, factura_detalle fd
                        WHERE fecha BETWEEN ${fechaInicio} AND ${fechaCierre} AND f.idTipoPago = t.id AND f.idTipoPago = ${idTipoPago} AND f.idFactura_Encabezado = fe.id AND fe.id = fd.idFactura_Encabezado
                        GROUP BY t.descripcion`
        );
        response.json(reportData);
    }
    else {
        //* Si no se especifican fechas entonces por defecto se busca por la fecha actual
        let currentDate = getCurrentDate();
        const reportData = await prisma.$queryRaw(
            Prisma.sql`SELECT t.descripcion as MetodoDePago, SUM(f.idTipoPago) as Cantidad
                        FROM TipoPago t, FacturaEncabezadoTipoPago f, Factura_Encabezado fe
                        WHERE fecha = ${currentDate} AND f.idTipoPago = t.id AND f.idFactura_Encabezado = fe.id
                        GROUP BY t.descripcion`
        );
        response.json(reportData);
    }
}

module.exports.ventasPorMesa = async (request, response, next) => {
    //* Casteo los parámetros
    let fechaInicio = request.body.fechaInicio;
    let fechaCierre = request.body.fechaCierre;
    let mesaID = parseInt(request.body.mesa);
    //Validar que haya enviado una mesa en el request
    if (mesaID === undefined) {
        response.status(400).json({
            success: false,
            message: "Mesa no especificada"
        })
    }
    else {
        const mesa = await prisma.mesa.findFirst({
            where: { id: mesaID },
          });

        if (fechaInicio !== undefined) {
            if (fechaCierre === undefined) {
                //* Si no viene la fecha de cierre entonces se toma la fecha actual
                fechaCierre = getCurrentDate();
            }
            //* Cantidad de productos vendidos x fecha
            const reportData = await prisma.$queryRaw(
                Prisma.sql`SELECT idMesa as Mesa
                            FROM Pedido
                            WHERE fecha BETWEEN ${fechaInicio} AND ${fechaCierre} AND idMesa = ${mesaID}`
            );
            response.json({"Mesa" : mesa.codigo, "Cantidad" : reportData.length});
        }
        else {
            //* Si no se especifican fechas entonces por defecto se busca por la fecha actual
            let currentDate = getCurrentDate();
            const reportData = await prisma.$queryRaw(
                Prisma.sql`SELECT idMesa as Mesa
                            FROM Pedido
                            WHERE fecha = ${currentDate} AND idMesa = ${mesaID}`
            );
            response.json({"Mesa" : mesa.codigo, "Cantidad" : reportData.length});
        }
    }
}


module.exports.ventasPorMesero = async (request, response, next) => {
    //* Casteo los parámetros
    let fechaInicio = request.body.fechaInicio;
    let fechaCierre = request.body.fechaCierre;
    let meseroID = request.body.mesero;
    //Validar que haya enviado una mesa en el request
    if (meseroID === undefined) {
        response.status(400).json({
            success: false,
            message: "Mesero no especificado"
        })
    }
    else {
        const mesero = await prisma.usuario.findFirst({
            where: { id: meseroID },
          });

        if (fechaInicio !== undefined) {
            if (fechaCierre === undefined) {
                //* Si no viene la fecha de cierre entonces se toma la fecha actual
                fechaCierre = getCurrentDate();
            }
            //* Cantidad de productos vendidos x fecha
            const reportData = await prisma.$queryRaw(
                Prisma.sql`SELECT idMesero as Mesero
                            FROM Pedido
                            WHERE fecha BETWEEN ${fechaInicio} AND ${fechaCierre} AND idMesero = ${meseroID}`
            );
            response.json({"Mesero" : mesero.id, "Cantidad" : reportData.length});
        }
        else {
            //* Si no se especifican fechas entonces por defecto se busca por la fecha actual
            let currentDate = getCurrentDate();
            const reportData = await prisma.$queryRaw(
                Prisma.sql`SELECT idMesero as Mesero
                            FROM Pedido
                            WHERE fecha = ${currentDate} AND idMesero = ${meseroID}`
            );
            response.json({"Mesero" : mesero.id, "Cantidad" : reportData.length});
        }
    }
}

function getCurrentDate() {
    var today = new Date();

    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    return `${year}-${month}-${day}`;
}