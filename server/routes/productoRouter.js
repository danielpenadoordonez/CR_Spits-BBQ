const express = require("express");
const router = express.Router();

const productRouter = require("../controllers/productoController");

router.get("/", productRouter.getAllProducts);
router.get("/all", productRouter.getAllProducts);
router.get("/:id", productRouter.getProductById);
router.get("/:idCategoria", productRouter.getProductsByCategory);

module.exports = router
