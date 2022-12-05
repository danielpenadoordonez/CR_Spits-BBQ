const express = require("express");
const router = express.Router();

const productRouter = require("../controllers/productoController");
const auth = require("../middleware/auth");

router.get("/", auth.grantRole(["Administrador", "Mesero", "Cliente"]), productRouter.getAllProducts); //* Cambiar luego, mesero no debería de poder
router.post("/", auth.grantRole(["Administrador", "Mesero"]), productRouter.createProduct);
router.get("/all", auth.grantRole(["Administrador"]), productRouter.getAllProducts);
router.get("/all-hability", auth.grantRole(["Administrador", "Mesero","Cliente"]), productRouter.getAllHabilityProducts);
router.get("/:id", productRouter.getProductById);
router.put("/:id", auth.grantRole(["Administrador", "Mesero"]), productRouter.updateProduct);
router.get("/categoria/:idCategoria", productRouter.getProductsByCategory);
router.get("/sucursal/:idSucursal", productRouter.getProductsBySucursal);

module.exports = router
