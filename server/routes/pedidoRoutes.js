const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

router.get("/", pedidoController.getAllPedidos);
router.get("/all", pedidoController.getAllPedidos);
router.get("/:id", pedidoController.getPedidoById);
router.get("/sucursal/:idSucursal", pedidoController.getPedidosByIdSucursal);
router.get("/usuario/:idUsuario", pedidoController.getPedidosByUsuario);
router.get("/estado/:idEstado", pedidoController.getPedidosByState);

module.exports = router