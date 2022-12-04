const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedidoController");
const auth = require("../middleware/auth");

router.get("/", auth.grantRole(["Administrador"]), pedidoController.getAllPedidos);
router.post("/register/", pedidoController.registerPedido);
router.get("/all", auth.grantRole(["Administrador"]), pedidoController.getAllPedidos);
router.get("/:id", auth.grantRole(["Administrador"]), pedidoController.getPedidoById);
router.get("/sucursal/:idSucursal", auth.grantRole(["Administrador", "Mesero"]), pedidoController.getPedidosByIdSucursal);
router.get("/usuario/:idUsuario", pedidoController.getPedidosByUsuario);
router.get("/estado/:idEstado", auth.grantRole(["Administrador"]), pedidoController.getPedidosByState);
router.put("/updateState/:id", auth.grantRole(["Mesero", "Cliente"]), pedidoController.updatePedido);

module.exports = router