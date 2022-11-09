const express = require("express");
const router = express.Router();

//Controller de Sucursal con la logica y las acciones del API
const sucursalController = require("../controllers/sucursalController");

//Rutas del API para Sucursal
router.get("/", sucursalController.getAllSucursales);
router.get("/all", sucursalController.getAllSucursales);
router.get("/:id", sucursalController.getSucursalById);
router.get("/codigo/:codigo", sucursalController.getSucursalByCode);

module.exports = router;