const express = require("express");
const router = express.Router();

//Controller del Usuario con la logica y las acciones del API
const usuarioController = require("../controllers/usuarioController");

//Rutas del API para usuario
router.get("/", usuarioController.getAllUsers);
router.post("/register", usuarioController.createUser)
router.get("/all", usuarioController.getAllUsers);
router.get("/:id", usuarioController.getUserById);
router.put("/:id", usuarioController.updateUser)
router.put("/pass/:id", usuarioController.updatePassword);
router.get("/perfil/:idPerfil", usuarioController.getUsersByProfile);
router.get("/username/:username", usuarioController.getUserByUserName);
router.get("/email/:email", usuarioController.getUserByEmail);

module.exports = router;
