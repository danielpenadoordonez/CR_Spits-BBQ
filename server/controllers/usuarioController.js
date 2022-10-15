const { PrismaClient} =  require("@prisma/client");

const prismaClient = new PrismaClient();

/*
            GET APIs
*/

//Todos los usuarios
module.exports.getAllUsers = async (request, response, next) => {
    const users = await prismaClient.usuario.findMany({
        orderBy:{
            nombre: 'asc'
        }
    });
    response.json(users);
};

//Obtener usuario por ID
module.exports.getUserById = async (request, response, next) => {
    let id = String(request.params.id);
    const user = await prismaClient.usuario.findUnique({
        where:{id: id},
        include:{
            reservaciones:true,
            pedidos:true
        }
    });
    response.json(user);
};

//Obtener usuario por username
module.exports.getUserByUserName = async (request, response, next) => {
    let username = String(request.params.username);
    const user = await prismaClient.usuario.findFirst({
        where:{username: username},
        include:{
            reservaciones:true,
            pedidos:true
        }
    });
    response.json(user);
};

//Obtener usuario por correo
module.exports.getUserByEmail = async (request, response, next) => {
    let email = String(request.params.email);
    const user = await prismaClient.usuario.findFirst({
        where:{email: email},
        include:{
            reservaciones:true,
            pedidos:true
        }
    });
    response.json(user);
};