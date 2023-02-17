const express = require("express");
const CommentController = require("../controllers/comment.controller");
const router = express.Router();

// Créer un commentaire
router.post("/", CommentController.create);

// Mettre à jour un commentaire avec un id donné
router.put("/:id", CommentController.update);

// Supprimer un commentaire avec un id donné
router.delete("/:id", CommentController.delete);

module.exports = router;
