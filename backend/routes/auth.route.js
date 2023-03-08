const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

// Enregistrer un utilisateur
router.post("/register", authController.signup);

module.exports = router;
