const express = require("express");
const router = express.Router();

const reservacionController = require("../controllers/reportController");
auth = require("../middleware/auth");

router.post("/ventas-fecha/", auth.grantRole(["Administrador"]), reservacionController.ventasPorFecha);

module.exports = router;
