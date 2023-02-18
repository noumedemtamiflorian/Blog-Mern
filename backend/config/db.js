// Importer le module mongoose
const mongoose = require("mongoose");

// Importer le module dotenv
const dotenv = require("dotenv");

// Chargement des variables d'environnement
dotenv.config();

// La chaîne de connexion à la base de données Mongo
const MONGO_DB_URI = process.env.MONGO_DB_URI;

// Le nom de la base de données
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
        console.log("-------------------------------");
        console.log("MongoDB Connecté...");
        console.log("-------------------------------");
    } catch (err) {
        // Affichage d'un message d'erreur
        console.error(err.message);
        process.exit(1);
    }
};

// Exporte la fonction connectDB
module.exports = connectDB;
