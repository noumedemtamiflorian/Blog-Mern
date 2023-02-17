// Importer le module Express
const express = require("express");

// Importer le controlleur de catégorie
const categoryController = require("../controllers/category.controller");

// Créer un routeur pour Express
const router = express.Router();

// Créer une catégorie
router.post("/", categoryController.create);

// Récupérer toutes les catégories
router.get("/", categoryController.findAll);

// Récupérer une catégorie avec un id donné
router.get("/:id", categoryController.findOne);

// Mettre à jour une catégorie
router.put("/:id", categoryController.update);

module.exports = router;
