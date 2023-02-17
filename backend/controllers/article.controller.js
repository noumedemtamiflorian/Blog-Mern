// Importer le modèle Article
const Article = require("../models/article.model");

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
        return res.status(403).json(err);
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
        return res.status(400).json(err);
    }
};
