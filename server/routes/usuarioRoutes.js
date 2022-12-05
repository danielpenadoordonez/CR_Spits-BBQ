const express = require("express");
const router = express.Router();

//Controller del Usuario con la logica y las acciones del API
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/auth");

//Rutas del API para usuario
router.get("/", auth.grantRole(["Administrador", "Mesero", "Cliente"]), usuarioController.getAllUsers); //* Lo cambio mientras Isaac arregla, solo admin
router.post("/register", usuarioController.createUser);
router.post("/login", usuarioController.login);
router.get("/all", usuarioController.getAllUsers);
router.get("/:id", usuarioController.getUserById);
router.put("/:id", usuarioController.updateUser);
router.put("/pass/:id", usuarioController.updatePassword);
router.get("/perfil/:idPerfil", auth.grantRole(["Administrador", "Mesero"]), usuarioController.getUsersByProfile);
router.get("/username/:username", usuarioController.getUserByUserName);
router.get("/email/:email", usuarioController.getUserByEmail);

module.exports = router;
