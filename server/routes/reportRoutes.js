const express = require("express");
const router = express.Router();

const reservacionController = require("../controllers/reportController");
auth = require("../middleware/auth");

router.post("/ventas-fecha/", auth.grantRole(["Administrador"]), reservacionController.ventasPorFecha);
router.post("/ventas-tipopago/", auth.grantRole(["Administrador"]), reservacionController.ventasPorMedioPago);

module.exports = router;
