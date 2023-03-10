const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const SECRETKEY = process.env.SECRETKEY;

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
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: "user",
            comments: [],
        });

        // Si c'est le premier utilisateur dans la base de données,
        //  lui donner le rôle d'administrateur
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            newUser.role = "admin";
        }

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

// Connexion
exports.signin = async (req, res) => {
    try {
        // Recherche de l'utilisateur dans la base de données en utilisant son nom
        const user = await User.findOne({ email: req.body.email });

        // Si l'utilisateur n'est pas trouvé, on retourne une réponse 404
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passwordMatch) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        // Génération d'un jeton avec les informations de l'utilisateur
        const token = jwt.sign(
            { userId: user._id, role: user.role, name: user.name },
            SECRETKEY,
            {
                expiresIn: "24h",
            }
        );

        // Envoi de la réponse avec le jeton
        res.send({ message: "User logged in successfully", token });
    } catch (error) {
        // Gestion des erreurs avec une réponse 500 en cas d'erreur
        res.status(500).send({
            message: error.message || "Some error occurred while logging in.",
        });
    }
};
