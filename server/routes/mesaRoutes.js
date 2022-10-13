const express = require("express");
const router = express.Router();

//Controller de Mesa con la logica y las acciones del API
const mesaController = require("../controllers/mesaController");

//Rutas del API para Mesa
router.get("/", mesaController.getAllMesas);
router.get("/all", mesaController.getAllMesas);
router.get("/:codigo", mesaController.getMesaByCode);
router.get("/sucursal/:idSucursal", mesaController.getMesaBySucursal);
router.get("/disponibilidad/:idDisponibilidad", mesaController.getMesaByDisponibilidad);
router.get("/disponibilidad/", mesaController.getDisponibilidadesMesas);
router.get("/disponibilidad/all", mesaController.getDisponibilidadesMesas);

module.exports = router;