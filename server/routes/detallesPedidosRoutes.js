const express = require("express");
const router = express.Router();

const detallesPedidoController = require("../controllers/detallesPedidosRoutes");

//* Sirve para obtener los detalles de un pedido

router.get("/", detallesPedidoController.getAllDetallesPedidos);
router.post("/", detallesPedidoController.createDetail);
router.get("/all", detallesPedidoController.getAllDetallesPedidos);
router.get("/:id", detallesPedidoController.getDetallesByPedidoId);
router.put("/:idPedido/:idProducto", detallesPedidoController.updateDetail);

module.exports = router