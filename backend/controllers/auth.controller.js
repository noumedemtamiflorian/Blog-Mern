const User = require("../models/user.model");

// Définition de la fonction signup avec la syntaxe async/await
//  pour rendre la fonction asynchrone
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    try {
        // Vérification si les champs obligatoires sont remplis
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res
                .status(400)
                .send({ message: "Name, email and password are required" });
        }

        // Vérification si l'email de l'utilisateur existe déjà
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).send({ message: "Email already exists" });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Création d'un nouvel utilisateur avec les informations saisies
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: "user",
            articles: [],
            comments: [],
            categories: [],
        });

        // Sauvegarde de l'utilisateur créé dans la base de données
        const data = await newUser.save();

        // Renvoi d'une réponse avec le nouveau utilisateur créé
        return res.status(200).send(data);
    } catch (error) {
        // Gestion des erreurs avec une réponse 500 en cas d'erreur
        return res.status(500).send({
            message:
                error.message || "Some error occurred while creating the user.",
        });
    }
};
