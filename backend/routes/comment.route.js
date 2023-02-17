const express = require("express");
const CommentController = require("../controllers/comment.controller");
const router = express.Router();

// Créer un commentaire
router.post("/", CommentController.create);

module.exports = router;
