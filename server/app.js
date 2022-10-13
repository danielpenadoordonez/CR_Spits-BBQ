const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prisma = new PrismaClient();


//Archivos de Rutas
const userRouter = require("./routes/usuarioRoutes");
const sucursalRouter = require("./routes/sucursalRoutes");
const mesaRouter = require("./routes/mesaRoutes");

//Acceder a la configuracion del archivo .env
dotEnv.config();

//Puerto que escucha por defecto 3000 o definido en .env
const port = process.env.port || 3000;

//Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
//Middleware para loggear llamadas al servidor
app.use(logger("dev"));
//Middleware para gestionar Requests y Response JSON
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Definicion de Rutas
app.use("/users/", userRouter);
app.use("/sucursales/", sucursalRouter);
app.use("/mesas/", mesaRouter);

//Servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log("Presione CTRL-C para detenerlo\n");
})