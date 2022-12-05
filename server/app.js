const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prisma = new PrismaClient();

//* Archivos de Rutas
const userRouter = require("./routes/usuarioRoutes");
const perfilRouter = require("./routes/perfilRoutes");
const sucursalRouter = require("./routes/sucursalRoutes");
const mesaRouter = require("./routes/mesaRoutes");
const dispRouter = require("./routes/disponibilidadRoutes");
const reservacionRouter = require("./routes/reservacionRoutes");
const categoriaProductoRouter = require("./routes/categoriaProductoRoutes");
const productRouter = require("./routes/productoRouter");
const tipoPagoRouter = require("./routes/tipoPagoRoutes");
const pedidoRouter = require("./routes/pedidoRoutes");
const detallesPedidos = require("./routes/detallesPedidosRoutes"); 
const estadoPedidoRouter = require("./routes/estadoPedidoRoutes");
const tipoPedidoRouter = require("./routes/tipoPedidoRoutes");
const facturaRouter = require("./routes/facturaRoutes");

//* Acceder a la configuracion del archivo .env
dotEnv.config();

//* Puerto que escucha por defecto 3000 o definido en .env
const port = process.env.port || 3000;

//* Middleware CORS para aceptar llamadas en el servidor
app.use(cors());

//* Middleware para loggear llamadas al servidor
app.use(logger("dev"));

//* Middleware para gestionar Requests y Response JSON
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//* Definicion de Rutas de los APIs
app.use("/users/", userRouter);
app.use("/perfiles/", perfilRouter);
app.use("/sucursales/", sucursalRouter);
app.use("/mesas/", mesaRouter);
app.use("/disponibilidades/", dispRouter);
app.use("/reservaciones/", reservacionRouter);
app.use("/categ-prods/", categoriaProductoRouter);
app.use("/productos/", productRouter);
app.use("/tipos-de-pago/", tipoPagoRouter);
app.use("/pedidos/", pedidoRouter);
app.use("/tipo-pedidos/", tipoPedidoRouter);
app.use("/detalles-pedido/", detallesPedidos);
app.use("/estado-pedidos/", estadoPedidoRouter);
//app.use("/factura/", facturaRouter);

//* Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log("Presione CTRL-C para detenerlo\n");
});
