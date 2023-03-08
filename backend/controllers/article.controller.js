// Importer les models de données nécessaires
const Article = require("../models/article.model"); // Model de données pour les articles
const Comment = require("../models/comment.model"); // Model de données pour les commentaires
const Category = require("../models/category.model"); // Model de données pour les catégories

// Créer un nouvel article
exports.create = async (req, res) => {
    // Tenter d'exécuter le code
    try {
        // Récupérer les informations de l'article à partir de la requête
        const { title, content, description, image, category } = req.body;

        // Vérifier si un article avec le meme titre existe déjà
        const article = await Article.findOne({ title });
        if (article) {
            // Si oui, renvoyer un message d'erreur
            return res.status(400).json({ message: "Article already exists." });
        }

        // Créer un nouvel article avec les informations données
        const newArticle = new Article({
            title,
            content,
            description,
            image,
            category,
        });

        // Sauvegarder le nouvel article
        const savedArticle = await newArticle.save();

        // Ajouter l'article dans la catégorie correspondante
        await Category.findByIdAndUpdate(category, {
            $addToSet: { articles: savedArticle._id },
        });

        // Renvoyer le nouvel article
        return res.json(savedArticle);
    } catch (err) {
        // S'il y a une erreur, renvoyer un message d'erreur
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
        const articles = await Article.find();
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
        const { title, content, description, image, category } = req.body;
        // Trouver et mettre à jour un article avec les nouvelles données
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { title, content, description, image, category },
            { new: true }
        );
        // Retourner le nouvel article dans la réponse
        return res.json(article);
    } catch (err) {
        // Retourner une erreur lorsque quelque chose ne va pas
        return res.status(400).json({ message: err.message });
    }
};

// Supprimer un article
exports.delete = async (req, res) => {
    try {
        // Trouver l'article à supprimer
        const article = await Article.findById(req.params.id);
        // Vérifier si l'article existe
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        // Supprimer l'article
        const deletedArticle = await Article.findByIdAndDelete(article._id);
        // Supprimer la catégorie et les commentaires associés à l'article
        await Promise.all([
            Category.findByIdAndUpdate(deletedArticle.category, {
                $pull: { articles: deletedArticle._id },
            }),
            Comment.deleteMany({ article: deletedArticle._id }),
        ]);
        // Retourner l'article supprimé
        return res.json(deletedArticle);
    } catch (err) {
        // Retourner une erreur
        return res.status(403).send({ message: err.message });
    }
};
