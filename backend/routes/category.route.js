// Importer le module Express
const express = require("express");
const { requireAdmin } = require("../config/jwt");

// Importer le controlleur de catégorie
const categoryController = require("../controllers/category.controller");

// Créer un routeur pour Express
const router = express.Router();

// Créer une catégorie
router.post("/", requireAdmin, categoryController.create);

// Récupérer toutes les catégories
router.get("/", categoryController.findAll);

// Récupérer une catégorie avec un id donné
router.get("/:id", categoryController.findOne);

// Mettre à jour une catégorie
router.put("/:id", requireAdmin, categoryController.update);

// Supprimer une catégorie
router.delete("/:id", requireAdmin, categoryController.delete);

module.exports = router;
