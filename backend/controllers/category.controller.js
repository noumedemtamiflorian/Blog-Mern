// Importer les models de données nécessaires
const Article = require("../models/article.model"); // Model de données pour les articles
const Comment = require("../models/comment.model"); // Model de données pour les commentaires
const Category = require("../models/category.model"); // Model de données pour les catégories

// Exporte une fonction pour créer une nouvelle catégorie
exports.create = async (req, res) => {
    // Essaie d'exécuter le code
    try {
        // Récupère le titre de la catégorie à partir de la requête
        const title = req.body.title;

        // Vérifie si la catégorie existe déjà
        const category = await Category.findOne({ title });
        if (category) {
            // Si oui, renvoie un code d'erreur et un message
            return res.status(400).json({ message: "Catégorie existe déjà." });
        }

        // Crée une nouvelle catégorie à partir des données fournies
        const newCategory = new Category({
            title,
        });

        // Enregistre la nouvelle catégorie
        await newCategory.save();

        // Renvoie un message indiquant que la catégorie a été ajoutée avec succès
        return res.json({ message: "Catégorie ajoutée avec succès" });
    } catch (err) {
        console.log(err);
        // Si une erreur se produit, renvoie un code d'erreur et le message d'erreur
        return res.status(400).json({ message: error.message });
    }
};

// Cette fonction retourne une liste de toutes les catégories disponibles
exports.findAll = async (req, res) => {
    // Essayez d'effectuer la requête
    try {
        // Récupérez toutes les catégories dans la base de données
        const categories = await Category.find();
        // Renvoyez la liste des catégories au client
        return res.json(categories);
        // Si la requête échoue
    } catch (error) {
        // Renvoyez une erreur 404 au client
        return res.status(404).json({ message: error.message });
    }
};

// Rechercher une catégorie par son identifiant
exports.findOne = async (req, res) => {
    // Essayer de trouver la catégorie
    try {
        const category = await Category.findById(req.params.id).populate({
            path: "articles",
            select: "title description image",
        });
        // Retourner la catégorie trouvée
        return res.json(category);
    } catch (error) {
        // Si une erreur se produit, retourner un code d'erreur 400
        return res.status(400).json({ message: error.message });
    }
};

// Mettre a jour la catégorie correspondant à l'ID
exports.update = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        // Mettre à jour le titre de la catégorie
        category.title = req.body.title;

        // Enregistrer les modifications
        await category.save();

        // Retourner un message de succès
        return res.json({
            message: "Catégorie mise à jour avec succès",
        });
    } catch (error) {
        // Retourner un message d'erreur
        return res.status(400).json({ message: error.message });
    }
};

// Suppression d'une catégorie
exports.delete = async (req, res) => {
    try {
        // Recherche de la catégorie
        const category = await Category.findById(req.params.id);
        // Vérification de l'existence de la catégorie
        if (!category) {
            return res.status(404).send({ message: "Catégorie introuvable" });
        }
        // Suppression de la catégorie
        const deletedCategory = await Category.findByIdAndDelete(category._id);
        // Suppression des articles et commentaires liés à la catégorie
        await Promise.all([
            Article.deleteMany({ category: deletedCategory._id }),
            Comment.deleteMany({
                article: {
                    $in: await Article.find({
                        category: deletedCategory._id,
                    }).distinct("_id"),
                },
            }),
        ]);
        // Retourne la catégorie supprimée
        return res.status(200).send(deletedCategory);
    } catch (err) {
        // Gestion des erreurs
        return res.status(403).send(err);
    }
};
