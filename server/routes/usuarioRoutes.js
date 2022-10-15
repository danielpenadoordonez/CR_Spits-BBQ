const express = require("express");
const router = express.Router();

//Controller del Usuario con la logica y las acciones del API
const usuarioController = require("../controllers/usuarioController");

//Rutas del API para usuario
router.get("/", usuarioController.getAllUsers);
router.get("/all", usuarioController.getAllUsers);
router.get("/:id", usuarioController.getUserById);
router.get("/:username", usuarioController.getUserByUserName);
router.get("/:email", usuarioController.getUserByEmail);

module.exports = router;
