const { PrismaClient } = require("@prisma/client");
const { time } = require("console");
const jwt = require("jsonwebtoken");

const prismaClient = new PrismaClient();

module.exports.verifyToken = async (request, response, next) => {
    const bearerHeader = request.headers["authorization"];
    let token;
    if(typeof bearerHeader !== "undefined"){
        token = bearerHeader.split(" ")[1].trim().toString();
    }
    else{
        response.status(403).json({
            status: false,
            message: "Acceso Denegado",
        });
    }
    if(token){
        const verify = jwt.verify(token, process.env.JWT_EXPIRE);
        const user = await prismaClient.usuario.findUnique({
            where: { username: verify.username},
        });
        request.user = verify;
        next();
    }
}

module.exports.grantRole = function(perfiles){
    return async (request, response, next) => {
        try{
            const bearerHeader = request.headers["authorization"];
            let token;
            if(typeof bearerHeader !== "undefined"){
                token = bearerHeader.split(" ")[1].trim().toString();
            }
            else{
                response.status(403).json({
                    status: false,
                    message: "Acceso Denegado",
                });
            }
            if(token){
                //Verifica al usuario
                const verify = jwt.verify(token, process.env.SECRET_KEY);
                const perfilVerified = await prismaClient.perfil.findFirst({
                    where: { id : verify.idPerfil}
                });
                if(perfiles.length && !perfiles.includes(perfilVerified.descripcion)){
                    return response.status(401).json({
                        success: false,
                        message: "Acceso no autorizado"
                    });
                }
                next();
            }
        } catch(error){
            next(error);
        }
    }
}