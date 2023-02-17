// Importer le module de mongoose
const mongoose = require("mongoose");
const Article = require("../models/article.model");

// Créer un schéma pour les commentaires
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    // Contenu du commentaire
    content: { type: String, required: true },

    // Référence à l'article auquel le commentaire est lié
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
});

// Créer un commentaire avec l'article lié
CommentSchema.statics.createWithArticle = async (content, article) => {
    // Récupérer le modèle Article et Comment
    const Comment = mongoose.model("Comment");

    // Créer un nouveau commentaire avec le contenu et l'article
    const comment = new Comment({ content, article });

    // Sauvegarder le commentaire
    const savedComment = await comment.save();

    // Mettre à jour l'article avec le commentaire
    await Article.findByIdAndUpdate(article, {
        $addToSet: { comments: savedComment._id },
    });

    // Retourner le commentaire sauvegardé
    return savedComment;
};

// Exporter le modèle de commentaire
module.exports = mongoose.model("Comment", CommentSchema);
