// Importer les models de données nécessaires
const Article = require("../models/article.model"); // Model de données pour les articles
const Comment = require("../models/comment.model"); // Model de données pour les commentaires

// Créer un nouveau commentaire
exports.create = async (req, res) => {
    try {
        // Récupérer le contenu et l'article du corps de la requête
        const { content, article } = req.body;

        // Créer un nouvel objet Commentaire
        const comment = new Comment({ content, article });

        // Sauvegarder le commentaire
        const savedComment = await comment.save();

        // Mettre à jour l'article en ajoutant le commentaire à la liste de commentaires
        await Article.findByIdAndUpdate(article, {
            $addToSet: { comments: savedComment._id },
        });

        // Renvoyer le commentaire sauvegardé
        return res.status(200).send(savedComment);
    } catch (err) {
        // En cas d'erreur, renvoyer le message d'erreur
        return res.status(403).send(err.message);
    }
};

// Cette fonction permet de mettre à jour un commentaire
exports.update = async (req, res) => {
    try {
        // On récupère le commentaire à partir de l'ID fourni
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        // On renvoie le commentaire mis à jour
        return res.status(200).send(updatedComment);
    } catch (err) {
        // Si une erreur survient, on la renvoie
        return res.status(500).send({ message: err.message });
    }
};

// Supprime un commentaire
exports.delete = async (req, res) => {
    try {
        // Récupère le commentaire à supprimer
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        // Met à jour l'article avec le commentaire supprimé
        await Article.findByIdAndUpdate(deletedComment.article, {
            $pull: { comments: deletedComment._id },
        });
        // Retourne le commentaire supprimé
        return res.status(200).json(deletedComment);
    } catch (err) {
        // Retourne un message d'erreur
        return res.status(403).json({ message: err.message });
    }
};
