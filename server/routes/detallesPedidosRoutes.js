const express = require("express");
const router = express.Router();

const detallesPedidoController = require("../controllers/detallesPedidosController");
const auth = require("../middleware/auth");
//* Sirve para obtener los detalles de un pedido

router.get("/", auth.grantRole(["Administrador"]), detallesPedidoController.getAllDetallesPedidos);
router.post("/", auth.grantRole(["Administrador", "Mesero", "Cliente"]), detallesPedidoController.createDetail);
router.get("/all", auth.grantRole(["Administrador"]), detallesPedidoController.getAllDetallesPedidos);
router.get("/:id", auth.grantRole(["Administrador"]), detallesPedidoController.getDetallesByPedidoId);
router.put("/:idPedido/:idProducto", auth.grantRole(["Administrador"]), detallesPedidoController.updateDetail);

module.exports = router