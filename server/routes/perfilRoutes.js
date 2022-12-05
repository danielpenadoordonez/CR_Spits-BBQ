const express = require("express");
const router = express.Router();

const perfilController = require("../controllers/perfilController");

router.get("/", perfilController.getPerfiles);
router.get("/all", perfilController.getPerfiles);

module.exports = router