const express = require("express");
const router = express.Router();

//Controller de Mesa con la logica y las acciones del API
const mesaController = require("../controllers/mesaController");

//Rutas del API para Mesa
router.get("/", mesaController.getAllMesas);
router.get("/all", mesaController.getAllMesas);
router.get("/:codigo", mesaController.getMesaByCode);
router.get("/sucursal/:idSucursal", mesaController.getMesasBySucursal);
router.get("/disponibilidad/:idDisponibilidad", mesaController.getMesasByDisponibilidad);
//Hay que incluir una ruta para seleccionar una mesa por sucursal y disponibilidad a la vez
//Tengo que ver como se hace para establecer una ruta asi

module.exports = router;