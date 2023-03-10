// Importer les models de données nécessaires
const Article = require("../models/article.model");
const Comment = require("../models/comment.model");
const Category = require("../models/category.model");

// Cette fonction crée un nouvel article
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
            $push: { articles: savedArticle._id },
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

        if (!article) {
            // Si l'article n'existe pas, renvoie un code d'erreur 404
            return res.status(404).json({ message: "Article not found" });
        }

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
        // Vérifier si l'article existe
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        // Mettre à jour les champs de l'article
        article.title = title || article.title;
        article.content = content || article.content;
        article.description = description || article.description;
        article.image = image || article.image;
        article.category = category || article.category;
        // Enregistrer les modifications
        await article.save();
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
        // Récupérer l'ID de l'article à supprimer depuis la requête
        const articleId = req.params.id;

        // Vérifier si l'article existe en base de données
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }

        // Supprimer l'article
        const deletedArticle = await Article.findByIdAndDelete(articleId);

        // Retirer l'article supprimé de la catégorie correspondante
        const categoryId = deletedArticle.category;
        await Category.findByIdAndUpdate(categoryId, {
            $pull: { articles: deletedArticle._id },
        });

        // Supprimer tous les commentaires associés à l'article supprimé
        await Comment.deleteMany({ article: deletedArticle._id });

        // Retourner l'article supprimé
        return res.json(deletedArticle);
    } catch (err) {
        // En cas d'erreur, retourner un message d'erreur
        return res.status(403).json({ message: err.message });
    }
};
