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

// Cette fonction supprime une catégorie et tous les articles et commentaires qui y sont associés
CategorySchema.statics.deleteWithArticles = async (categoryId) => {
    try {
        // Récupérer le modèle de Catégorie
        const Category = mongoose.model("Category");
        // Supprimer la catégorie
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        // Supprimer tous les articles et commentaires associés à la catégorie
        await Promise.all([
            // Supprimer tous les articles associés à la catégorie
            Article.deleteMany({ category: deletedCategory._id }),
            // Supprimer tous les commentaires associés à un article associé à la catégorie
            Comment.deleteMany({
                article: {
                    $in: await Article.find({
                        category: deletedCategory._id,
                    }).distinct("_id"),
                },
            }),
        ]);

        return deletedCategory;
    } catch (error) {
        return error;
    }
};

// Exporter le modèle avec le schéma associé
module.exports = mongoose.model("Category", CategorySchema);
