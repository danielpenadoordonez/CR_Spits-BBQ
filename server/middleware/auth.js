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

module.exports.grantRole = function(roles){
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
                const verify = jwt.verify(token, process.env.JWT_EXPIRE);
                if(roles.length && !roles.includes(verify.role.toUpperCase())){
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