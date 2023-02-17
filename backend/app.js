// Importer le package Express pour créer l'application web
const express = require("express");

// Importer le package dotenv pour lire les variables d'environnement
const dotenv = require("dotenv");

// Importer le package ansicolor pour afficher des couleurs sur la console
const ansicolor = require("ansi-colors");

// Importer la configuration de la base de données
const db = require("./config/db.js");

// Importer le routeur de commentaires
const commentRoute = require("./routes/comment.route");

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application
const app = express();

// Parser les demandes entrantes en format JSON
app.use(express.json());

// Configuration du header Access-Control-Allow-Origin et Access-Control-Allow-Headers, Access-Control-Allow-Methods sur le serveur ExpressJS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// Connexion à la base de données
db();

// utiliser la route de commentaire
app.use("/api/comments", commentRoute);

// Définition du port
const port = process.env.PORT || 3000;

// Exécution du serveur
app.listen(port, () => {
    console.log(
        ansicolor.yellow.bold.italic("--------------------------------------")
    );
    console.log(
        ansicolor.green.bold.italic(
            `Serveur en cours d'exécution sur le port ${port}`
        )
    );
    console.log(
        ansicolor.yellow.bold.italic("--------------------------------------")
    );
});
