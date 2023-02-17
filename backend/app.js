// Import des modules
const express = require("express");
// Importer dotenv pour  gerer les fichiers d'environnements
const dotenv = require("dotenv");
// Importer ansi-colors pour afficher les messages en couleur dans la console
const ansicolor = require("ansi-colors");
// Importer la base de donnees
const db = require("./config/db.js");

// Importer les routes
const articleRoute = require("./routes/article.route");

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application
const app = express();

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

// Parser les demandes entrantes en format JSON
app.use(express.json());

// Connexion à la base de données
db();

// Utiliser les routes
app.use("/api/articles", articleRoute);

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
