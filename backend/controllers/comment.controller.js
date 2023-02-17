// Importer le modèle Comment
const Comment = require("../models/comment.model");

// Créer une nouvelle fonction pour créer des commentaires
exports.create = async (req, res) => {
    try {
        // Récupérer le contenu et l'article à partir de la requête
        const { content, article } = req.body;

        // Appeler la méthode createWithArticle pour créer un nouveau commentaire avec l'article spécifié
        const comment = await Comment.createWithArticle(content, article);

        // Renvoyer le commentaire créé avec un statut de succès
        return res.status(200).send(comment);
    } catch (err) {
        // En cas d'erreur, envoyer un statut d'erreur et le message d'erreur
        return res.status(403).send(err.message);
    }
};
