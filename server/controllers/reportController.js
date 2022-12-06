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
        //* console.log(`Inicio: ${fechaInicio}  -   Cierre: ${fechaCierre}`);
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
            Prisma.sql`SELECT p.nombre as codigo, p.precio, p.fecha, s.nombre, tp.descripcion, ep.descripcion as estado 
                        FROM Pedido p, Sucursal s, TipoPedido tp, EstadoPedido ep 
                        WHERE fecha = ${currentDate} 
                                and p.idSucursal = s.id and p.idTipoPedido = tp.id
                                and p.idEstado = ep.id;`
        );
        response.json(reportData);
    }
}


module.exports.ventasPorMedioPago = async (request, response, next) => {
    const reportData = await prisma.$queryRaw(

    );
    response.json(reportData);
}

function getCurrentDate() {
    var today = new Date();

    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    return `${year}-${month}-${day}`;
}