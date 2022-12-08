const { PrismaClient, Prisma, } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.ventasPorFecha = async (request, response, next) => {
    //* Casteo los parámetros
    let fechaInicio = request.body.fechaInicio;
    let fechaCierre = request.body.fechaCierre;

    if (fechaInicio !== undefined) {
        if(fechaCierre === undefined){
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

    if (fechaInicio !== undefined) {
        if(fechaCierre === undefined){
            //* Si no viene la fecha de cierre entonces se toma la fecha actual
            fechaCierre = getCurrentDate();
        }
        //* Cantidad de productos vendidos x fecha
        const reportData = await prisma.$queryRaw(
            Prisma.sql`SELECT t.descripcion as MetodoDePago, SUM(f.idTipoPago) as Cantidad
                        FROM TipoPago t, FacturaEncabezadoTipoPago f, Factura_Encabezado fe
                        WHERE fecha BETWEEN ${fechaInicio} AND ${fechaCierre} AND f.idTipoPago = t.id AND f.idFactura_Encabezado = fe.id
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

function getCurrentDate() {
    var today = new Date();

    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    return `${year}-${month}-${day}`;
}