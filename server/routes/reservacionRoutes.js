const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservacionController");

router.get("/", reservationController.getAllReservations);
router.post("/", reservationController.createReservation);
router.get("/all", reservationController.getAllReservations);
router.get("/sucursal/:idSucursal", reservationController.getReservationsBySucursal);
router.get("/usuario/:idUsuario", reservationController.getReservationsByUser);
router.put("/:id", reservationController.updateReservation);

module.exports = router