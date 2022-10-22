const express = require("express");
const router = express.Router();

const productRouter = require("../controllers/productoController");

router.get("/", productRouter.getAllProducts);
router.get("/all", productRouter.getAllProducts);
router.get("/:id", productRouter.getProductById);
router.get("/categoria/:idCategoria", productRouter.getProductsByCategory);
router.get("/sucursal/:idSucursal", productRouter.getProductsBySucursal);

module.exports = router
