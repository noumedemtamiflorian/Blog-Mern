// Importer le module de mongoose
const mongoose = require("mongoose");

// Créer un schéma pour les commentaires
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    // Contenu du commentaire
    content: { type: String, required: true },

    // Référence à l'article auquel le commentaire est lié
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
});

// Exporter le modèle de commentaire
module.exports = mongoose.model("Comment", CommentSchema);
