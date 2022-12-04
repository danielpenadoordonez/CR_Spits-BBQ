const express = require("express");
const router = express.Router();

//* Controller de Mesa con la logica y las acciones del API
const mesaController = require("../controllers/mesaController");
const auth = require("../middleware/auth");

//* Rutas del API para Mesa
router.get("/", auth.grantRole(["Administrador"]), mesaController.getAllMesas);
router.post("/", auth.grantRole(["Administrador", "Mesero"]), mesaController.createTable);
router.get("/all", auth.grantRole(["Administrador"]), mesaController.getAllMesas);
router.get("/all-hability", auth.grantRole(["Administrador"]), mesaController.getAllHabilityMesas);
router.get("/:id", mesaController.getMesaById);
router.get("/codigo/:codigo", mesaController.getMesaByCode);
router.get("/sucursal/:idSucursal", mesaController.getMesasBySucursal);
router.get("/disponibilidad/:idDisponibilidad", mesaController.getMesasByDisponibilidad);
router.get("/sucursal-disponibilidad/:idSucursal/:idDisponibilidad", mesaController.getMesasBySucursalandDisp);
router.put("/:codigo", auth.grantRole(["Administrador", "Mesero"]), mesaController.updateTable);

module.exports = router;