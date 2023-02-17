// Importer le module mongoose pour créer le schéma
const mongoose = require("mongoose");

// Importer le modèle "Category"
const Category = require("./category.model");

// Create a Schema for an Article
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
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    // Ajouter des commentaires à l'article
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

// Ce code permet de créer un nouvel article avec une catégorie associée
ArticleSchema.statics.createWithCategory = async (
    title, // titre de l'article
    content, // contenu de l'article
    description, // description de l'article
    image, // image associée à l'article
    category // catégorie à laquelle l'article doit être associé
) => {
    try {
        const Article = mongoose.model("Article"); // Récupère le modèle Article

        const article = new Article({
            // Crée un nouvel article
            title,
            content,
            description,
            image,
            category,
        });

        const savedArticle = await article.save(); // Sauvegarde l'article

        await Category.findByIdAndUpdate(category, {
            // Met à jour la catégorie associée à l'article
            $addToSet: { articles: savedArticle._id },
        });

        return savedArticle; // Retourne le nouvel article
    } catch (error) {
        return error; // Retourne l'erreur
    }
};

// Export the Article Schema
module.exports = mongoose.model("Article", ArticleSchema);
