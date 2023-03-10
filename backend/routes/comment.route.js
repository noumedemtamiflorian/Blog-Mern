const express = require("express");
const { requireAuth } = require("../config/jwt");
const CommentController = require("../controllers/comment.controller");
const router = express.Router();

// Créer un commentaire
router.post("/", requireAuth, CommentController.create);

// Mettre à jour un commentaire avec un id donné
router.put("/:id", requireAuth, CommentController.update);

// Supprimer un commentaire avec un id donné
router.delete("/:id", requireAuth, CommentController.delete);

module.exports = router;
