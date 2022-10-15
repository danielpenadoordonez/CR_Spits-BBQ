const express = require("express");
const router = express.Router();

const dispController = require("../controllers/disponibilidadController");

router.get("/", dispController.getDisponibilidadesMesas);
router.get("/all", dispController.getDisponibilidadesMesas);

module.exports = router