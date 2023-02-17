// Importer le module mongoose pour créer le schéma
const mongoose = require("mongoose");

// Créer le schéma
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    // Ajouter un titre à l'article, ce champ est requis
    title: { type: String, required: true },
    // Ajouter le contenu de l'article, ce champ est requis
    content: { type: String, required: true },
    // Ajouter une description de l'article, ce champ est requis
    description: { type: String, required: true },
    // Ajouter une image à l'article, ce champ est requis
    image: { type: String, required: true },
    // Ajouter des commentaires à l'article
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

// Exporter le schéma
module.exports = mongoose.model("Article", ArticleSchema);
