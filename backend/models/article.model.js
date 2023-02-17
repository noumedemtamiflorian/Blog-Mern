// Import the mongoose module
const mongoose = require("mongoose");

// Create a Schema for an Article
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

// Export the Article Schema
module.exports = mongoose.model("Article", ArticleSchema);
