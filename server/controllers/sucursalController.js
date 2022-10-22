const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            *GET APIs
*/

//Todas las sucursales
module.exports.getAllSucursales = async (request, response, next) => {
    const sucursales = await prismaClient.sucursal.findMany({
        orderBy:{
            nombre: 'asc'
        }
    });
    response.json(sucursales);
};

//Obtener sucursal por ID
module.exports.getSucursalById = async (request, response, next) => {
    let id = String(request.params.id);
    const sucursal = await prismaClient.sucursal.findUnique({
        where:{id: id},
        include:{
            mesas:true, //Se trae todas las mesas de esa sucursal
            reservaciones:true, //Se trae todas las reservaciones de esa sucursal
            productos:true, //Se trae todos los productos de esa sucursal
            MeseroOnSucursal: true //Se trae todos los meseros de esa sucursal
        }
    });
    response.json(sucursal);
};

//Obtener sucursal por Codigo
module.exports.getSucursalByCode = async (request, response, next) => {
    let code = String(request.params.codigo);
    const sucursal = await prismaClient.sucursal.findFirst({
        where:{codigo: code},
        include:{
            mesas:true, //Se trae todas las mesas de esa sucursal
            reservaciones:true, //Se trae todas las reservaciones de esa sucursal
            productos:true, //Se trae todos los productos de esa sucursal
            MeseroOnSucursal: true //Se trae todos los meseros de esa sucursal
        }
    });
    response.json(sucursal);
};