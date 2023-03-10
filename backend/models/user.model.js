const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définition du schéma User
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("User", UserSchema);
