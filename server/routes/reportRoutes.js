const express = require("express");
const router = express.Router();

const reservacionController = require("../controllers/reportController");
auth = require("../middleware/auth");

router.get("/ventas-fecha", reservacionController.ventasPorFecha);

module.exports = router;
