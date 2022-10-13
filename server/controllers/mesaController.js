const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            GET APIs
*/

//Todas las mesas
module.exports.getAllMesas = async (request, response, next) => {
    const mesas = await prismaClient.mesa.findMany({
        orderBy:{
            codigo: 'asc'
        }
    });
    response.json(mesas);
};

//Obtener mesa por Codigo
module.exports.getMesaByCode = async (request, response, next) => {
    let code = String(request.params.codigo);
    const mesa = await prismaClient.mesa.findFirst({
        where:{codigo: code},
        include:{
            reservaciones:true,
        }
    });
    response.json(mesa);
};

//Obtener mesas por Disponibilidad
module.exports.getMesaByDisponibilidad = async (request, response, next) => {
    let disponibilidad = request.params.idDisponibilidad;
    const mesas = await prismaClient.mesa.findMany({
        where:{idDisponibilidad: disponibilidad},
        include:{
            reservaciones:true,
        }
    });
    response.json(mesas);
};

//Obtener mesa por Sucursal
module.exports.getMesaBySucursal = async (request, response, next) => {
    let sucursal = request.params.idSucursal;
    const mesas = await prismaClient.mesa.findMany({
        where:{idSucursal: sucursal},
        include:{
            reservaciones:true,
        }
    });
    response.json(mesas);
};

//Obtener las Disponibilidades que puede tener una mesa
module.exports.getDisponibilidadesMesas = async (request, response, next) => {
    const disponibilidades = await prismaClient.disponibilidadMesa.findMany({
        orderBy:{id: 'asc'}
    });
    response.json(disponibilidades);
};

