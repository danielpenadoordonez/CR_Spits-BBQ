const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservacionController");
const auth = require("../middleware/auth");

router.get("/", auth.grantRole(["Administrador"]), reservationController.getAllReservations);
router.post("/", reservationController.createReservation);
router.get("/all", auth.grantRole(["Administrador"]), reservationController.getAllReservations);
router.get("/:id", reservationController.getReservationById);
router.put("/:id", reservationController.updateReservation);
router.get("/sucursal/:idSucursal", reservationController.getReservationsBySucursal);
router.get("/usuario/:idUsuario", reservationController.getReservationsByUser);

module.exports = router