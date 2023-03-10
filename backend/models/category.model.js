// Importer le module mongoose pour pouvoir créer et manipuler des modèles MongoDB
const mongoose = require("mongoose");
// Récupérer le modèle d'Article
const Article = require("../models/article.model");
// Récupérer le modèle de Commentaire
const Comment = require("../models/comment.model");

// Créer un schéma pour le modèle de catégorie
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    // Définir le titre de la catégorie qui est obligatoire
    title: { type: String, required: true },
    // Définir la liste d'articles associés à la catégorie
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});

// Exporter le modèle avec le schéma associé
module.exports = mongoose.model("Category", CategorySchema);
