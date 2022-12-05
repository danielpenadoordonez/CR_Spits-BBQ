const express = require("express");
const router = express.Router();

const facturaController = require("../controllers/facturaController");
const auth = require("../middleware/auth");

router.get("/", auth.grantRole(["Administrador"]), facturaController.getAllFacturas);
router.post("/save", facturaController.saveFactura);
router.get("/all", auth.grantRole(["Administrador"]), facturaController.getAllFacturas);
router.get("/:idUsuario", auth.grantRole(["Administrador", "Cliente"]), facturaController.getFacturasByUser);
router.get("/:id", facturaController.getFacturaById);