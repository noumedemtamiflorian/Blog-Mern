// Importation du module mongoose
const mongoose = require("mongoose");
// Création d'un schéma pour le modèle Comment
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    // Définition d'un champ pour le contenu du commentaire
    content: { type: String, required: true },
    // Définition d'un champ pour référencer l'article
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
});
// Export du modèle Comment
module.exports = mongoose.model("Comment", CommentSchema);
