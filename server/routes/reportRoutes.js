const express = require("express");
const router = express.Router();

const reservacionController = require("../controllers/reportController");
auth = require("../middleware/auth");

router.post("/ventas-fecha/", auth.grantRole(["Administrador"]), reservacionController.ventasPorFecha);
router.post("/ventas-tipopago/", auth.grantRole(["Administrador"]), reservacionController.ventasPorMedioPago);
router.post("/ventas-mesa/", auth.grantRole(["Administrador"]), reservacionController.ventasPorMesa);
router.post("/ventas-mesero/", auth.grantRole(["Administrador", "Mesero"]), reservacionController.ventasPorMesero);

module.exports = router;
