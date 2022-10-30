const express = require("express");
const router = express.Router();

//* Controller de Mesa con la logica y las acciones del API
const mesaController = require("../controllers/mesaController");

//* Rutas del API para Mesa
router.get("/", mesaController.getAllMesas);
router.post("/", mesaController.createTable);
router.get("/all", mesaController.getAllMesas);
router.get("/:id", mesaController.getMesaById);
router.get("/codigo/:codigo", mesaController.getMesaByCode);
router.get("/sucursal/:idSucursal", mesaController.getMesasBySucursal);
router.get("/disponibilidad/:idDisponibilidad", mesaController.getMesasByDisponibilidad);
router.get("/sucursal-disponibilidad/:idSucursal/:idDisponibilidad", mesaController.getMesasBySucursalandDisp);
router.put("/:codigo", mesaController.updateTable);

module.exports = router;