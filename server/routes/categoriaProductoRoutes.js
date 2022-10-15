const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoriaProductoController");

router.get("/", categoriaController.getCategoriasProd);
router.get("/all", categoriaController.getCategoriasProd);

module.exports = router;