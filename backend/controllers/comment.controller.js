// Importer les models de données nécessaires
const Article = require("../models/article.model"); // Model de données pour les articles
const Comment = require("../models/comment.model"); // Model de données pour les commentaires
const User = require("../models/user.model");

// Créer un nouveau commentaire
exports.create = async (req, res) => {
    try {
        // Récupérer le contenu et l'article du corps de la requête
        const { content, article, user } = req.body;

        // Créer un nouvel objet Commentaire
        const comment = new Comment({ content, article, user });

        // Sauvegarder le commentaire
        const savedComment = await comment.save();

        // Mettre à jour l'article en ajoutant le commentaire à la liste de commentaires
        await Article.findByIdAndUpdate(article, {
            $push: { comments: savedComment._id },
        });

        // Mettre à jour l'user en ajoutant le commentaire à la liste de commentaires
        await User.findByIdAndUpdate(user, {
            $push: { comments: savedComment._id },
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
        const { userId } = req.user;

        const comment = await Comment.findById(req.params.id);

        // Vérifier si le commentaire existe
        if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
        }

        // Vérifier si l'utilisateur est autorisé à mettre à jour le commentaire
        if (userId !== comment.user.toString()) {
            return res.status(403).send({
                message: "User is not authorized to update this comment",
            });
        }
        // Mettre à jour le commentaire
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).send(updatedComment);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// Supprime un commentaire
exports.delete = async (req, res) => {
    try {
        const { userId } = req.user;

        // Trouver le commentaire à supprimer
        const comment = await Comment.findById(req.params.id);

        // Vérifier si le commentaire existe
        if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
        }

        // Vérifier si l'utilisateur est autorisé à supprimer le commentaire
        if (userId !== comment.user.toString()) {
            return res.status(403).send({
                message: "User is not authorized to delete this comment",
            });
        }

        // Supprimer le commentaire
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);

        // Retirer le commentaire de la liste des commentaires de l'article associé
        await Article.findByIdAndUpdate(comment.article, {
            $pull: { comments: comment._id },
        });

        // Retirer le commentaire de la liste des commentaires de l'utilisateur associé
        await User.findByIdAndUpdate(comment.user, {
            $pull: { comments: comment._id },
        });

        // Renvoyer le commentaire supprimé
        return res.status(200).json(deletedComment);
    } catch (error) {
        // Gérer les erreurs
        return res.status(500).send({ message: error.message });
    }
};
