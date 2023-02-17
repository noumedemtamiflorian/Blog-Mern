// Importer le module Express
const express = require("express");

// Importer le controlleur de catégorie
const categoryController = require("../controllers/category.controller");

// Créer un routeur pour Express
const router = express.Router();

// Créer une catégorie
router.post("/", categoryController.create);

module.exports = router;
