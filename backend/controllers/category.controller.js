// Récupère le modèle pour la catégorie
const Category = require("../models/category.model");

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
        return res.status(400).json(err);
    }
};
