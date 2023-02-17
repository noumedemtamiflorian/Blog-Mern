// Import des modules
const express = require("express");
const dotenv = require("dotenv");
const ansicolor = require("ansi-colors");
const db = require("./config/db.js");

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application
const app = express();

// Connexion à la base de données
db();

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
