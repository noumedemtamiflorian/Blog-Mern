const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

// Enregistrer un utilisateur
router.post("/register", authController.signup);

// Se connecter
router.post("/login", authController.signin);

module.exports = router;
