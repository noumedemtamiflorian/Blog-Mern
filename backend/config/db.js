// Importation des modules nécessaires
const mongoose = require("mongoose");
const ansicolor = require("ansi-colors");
const dotenv = require("dotenv");

// Chargement des variables d'environnement
dotenv.config();

// Récupération des variables d'environnement
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

// Fonction asynchrone pour se connecter à la base de données
const connectDB = async () => {
    try {
        // Désactive les contrôles stricts sur les requêtes
        await mongoose.set("strictQuery", false);

        // Connection à la base de données MongoDB
        await mongoose.connect(MONGO_DB_URI, {
            dbName: DATABASE_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Affichage d'un message de confirmation
        console.log(
            ansicolor.yellow.bold.italic("-------------------------------")
        );
        console.log(ansicolor.green.bold.italic("MongoDB Connecté..."));
        console.log(
            ansicolor.yellow.bold.italic("-------------------------------")
        );
    } catch (err) {
        // Affichage d'un message d'erreur
        console.error(err.message);
        process.exit(1);
    }
};

// Exporte la fonction connectDB
module.exports = connectDB;
