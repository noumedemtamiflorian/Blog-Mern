// Importer le modèle Article
const Article = require("../models/article.model");
const Comment = require("../models/comment.model");
const Category = require("../models/category.model");

// Exporter une fonction pour créer un nouvel article
exports.create = async (req, res) => {
    // Essayer de trouver un article avec le même titre
    try {
        const { title, content, description, image, category } = req.body;
        const article = await Article.findOne({ title });
        // Si un article a déjà été trouvé, alors retourne un message d'erreur
        if (article) {
            return res.status(400).json({ message: "Article already exists." });
        }
        // Créer le nouvel article avec sa catégorie
        const newArticle = await Article.createWithCategory(
            title,
            content,
            description,
            image,
            category
        );
        // Retourner le nouvel article
        return res.json(newArticle);
    } catch (err) {
        // Retourne un message d'erreur si la requête échoue
        return res.status(403).json({ message: err.message });
    }
};

// Récupère un article en fonction de son identifiant
exports.findOne = async (req, res) => {
    try {
        // Récupère l'article correspondant à l'identifiant fourni
        const article = await Article.findById(req.params.id).populate({
            // Récupère la catégorie et les commentaires de l'article
            path: "category comments",
            // Sélectionne le titre et le contenu des commentaires
            select: "title content",
        });
        // Renvoie l'article au client
        return res.json(article);
    } catch (err) {
        // Renvoie un code d'erreur 400 si une erreur se produit
        return res.status(400).json({ message: err.message });
    }
};

// Exporter une fonction qui récupère tous les articles
exports.findAll = async (req, res) => {
    try {
        // Récupérer tous les articles et leur catégorie
        const articles = await Article.find().populate({
            path: "category",
            select: "title",
        });
        // Retourner les articles au format JSON
        return res.json(articles);
    } catch (err) {
        // Retourner une erreur 400 si le traitement échoue
        return res.status(400).json({ message: err.message });
    }
};

// Exporter une fonction qui met à jour un article
exports.update = async (req, res) => {
    try {
        // Récupérer les données du corps de la requête
        const { title, content, description, image } = req.body;
        // Trouver et mettre à jour un article avec les nouvelles données
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { title, content, description, image },
            { new: true }
        );
        // Retourner le nouvel article dans la réponse
        return res.json(article);
    } catch (err) {
        // Retourner une erreur lorsque quelque chose ne va pas
        return res.status(400).json({ message: err.message });
    }
};

// Exporter une fonction asynchrone pour supprimer un article
exports.delete = async (req, res) => {
    // Essayez de trouver un article en fonction de l'ID spécifié
    try {
        const article = await Article.findById(req.params.id);
        // Si aucun article n'est trouvé, renvoyez un message d'erreur
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        // Supprimez l'article et sa catégorie
        await Article.deleteWithCategory(article._id);
        // Renvoyez un message de confirmation une fois l'opération réussie
        return res.json({ message: "Article supprimé avec succès" });
    } catch (err) {
        // Si une erreur se produit, renvoyez un message correspondant
        return res.status(403).send({ message: err.message });
    }
};
