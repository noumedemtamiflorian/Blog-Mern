// Importer l'utilitaire Express
const express = require("express");
const { requireAdmin } = require("../config/jwt");

// Importer le contrôleur d'article
const articleController = require("../controllers/article.controller");

// Création du routeur Express
const router = express.Router();

// ajouter une route pour obtenir tous les articles
router.get("/", articleController.findAll);

// Récupérer un article avec son ID
router.get("/:id", articleController.findOne);

// Crée un nouvel article
router.post("/", requireAdmin, articleController.create);

// Mettre à jour un article
router.put("/:id", requireAdmin, articleController.update);

// Supprimer un article
router.delete("/:id", requireAdmin, articleController.delete);

module.exports = router;
