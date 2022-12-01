const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedidoController");
const auth = require("../middleware/auth");

router.get("/", pedidoController.getAllPedidos);
router.post("/register/", auth.grantRole(["Administrador", "Mesero", "Cliente"]), pedidoController.registerPedido);
router.get("/all", pedidoController.getAllPedidos);
router.get("/:id", pedidoController.getPedidoById);
router.get("/sucursal/:idSucursal", pedidoController.getPedidosByIdSucursal);
router.get("/usuario/:idUsuario", pedidoController.getPedidosByUsuario);
router.get("/estado/:idEstado", pedidoController.getPedidosByState);
router.put("/updateState/:id", auth.grantRole(["Mesero", "Cliente"]), pedidoController.updatePedido);

module.exports = router