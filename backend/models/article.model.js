// Import the mongoose module
const mongoose = require("mongoose");

// Importer le modèle "Category"
const Category = require("./category.model");

// Create a Schema for an Article
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
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
