// Importer express pour créer un serveur
const express = require("express");

// Importer dotenv pour charger les variables d'environnement
const dotenv = require("dotenv");

// Importer ansicolor pour les couleurs dans le log
const ansicolor = require("ansi-colors");

// Importer le fichier db pour la connexion à la base de données
const db = require("./config/db.js");

// On importe le fichier des routes pour les catégories
const categoryRoute = require("./routes/category.route");

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

// On utilise Express pour créer une route pour les catégories
app.use("/api/categories", categoryRoute);

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
