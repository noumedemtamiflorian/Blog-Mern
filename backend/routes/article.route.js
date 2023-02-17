// Importer l'utilitaire Express
const express = require("express");

// Importer le contrôleur d'article
const articleController = require("../controllers/article.controller");

// Création du routeur Express
const router = express.Router();

// Crée un nouvel article
router.post("/", articleController.create);

// ajouter une route pour obtenir tous les articles
router.get("/", articleController.findAll);

module.exports = router;
