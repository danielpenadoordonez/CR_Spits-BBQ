const express = require("express");
const router = express.Router();

const tipoPedidoController = require("../controllers/tipoPedidoController");

router.get("/", tipoPedidoController.getTiposPedido);
router.get("/all", tipoPedidoController.getTiposPedido);

module.exports = router;