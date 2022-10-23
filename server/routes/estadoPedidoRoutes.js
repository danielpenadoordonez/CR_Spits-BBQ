const express = require("express");
const router = express.Router();

const estadoController = require("../controllers/estadoPedidoController");

router.get("/", estadoController.getEstadosPedidos);
router.get("/all", estadoController.getEstadosPedidos);

module.exports = router