const express = require("express");
const router = express.Router();

const tipoPagoController = require("../controllers/tipoPagoController");

router.get("/", tipoPagoController.getTiposPago);
router.get("/all", tipoPagoController.getTiposPago);

module.exports = router
