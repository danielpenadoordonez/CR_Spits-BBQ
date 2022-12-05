const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservacionController");
const auth = require("../middleware/auth");

router.get("/", auth.grantRole(["Administrador"]), reservationController.getAllReservations);
router.post("/", auth.grantRole(["Administrador", "Mesero", "Cliente"]), reservationController.createReservation);
router.get("/all", auth.grantRole(["Administrador"]), reservationController.getAllReservations);
router.get("/:id", auth.grantRole(["Administrador", "Mesero", "Cliente"]), reservationController.getReservationById);
router.put("/:id", auth.grantRole(["Administrador", "Mesero"]),reservationController.updateReservation);
router.get("/sucursal/:idSucursal", auth.grantRole(["Administrador", "Mesero"]), reservationController.getReservationsBySucursal);
router.get("/usuario/:idUsuario", auth.grantRole(["Administrador", "Cliente"]), reservationController.getReservationsByUser);

module.exports = router