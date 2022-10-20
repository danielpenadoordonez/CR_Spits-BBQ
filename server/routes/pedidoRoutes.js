const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

router.get("/", pedidoController.getAllPedidos);
router.get("/all", pedidoController.getAllPedidos);
router.get("/:id", pedidoController.getPedidoById);
router.get("/:idUsuario", pedidoController.getPedidosByUsuario);

module.exports = router