// Importer le module mongoose pour créer le schéma
const mongoose = require("mongoose");

// Créer le schéma pour les articles
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    // Titre : Requis (String)
    title: { type: String, required: true },
    // Contenu : Requis (String)
    content: { type: String, required: true },
    // Description : Requis (String)
    description: { type: String, required: true },
    // Image : Requis (String)
    image: { type: String, required: true },
    // Catégorie : Requis (ObjectId, référence à la collection Category)
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    // Commentaires : Optionnel (Array de ObjectId, référence à la collection Comment)
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

// Exporter le modèle
module.exports = mongoose.model("Article", ArticleSchema);
