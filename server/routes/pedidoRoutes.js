const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

router.get("/", pedidoController.getAllPedidos);
router.get("/all", pedidoController.getAllPedidos);
router.get("/usuario/:idUsuario", pedidoController.getPedidosByUsuario);
router.get("/:id", pedidoController.getPedidoById);

module.exports = router