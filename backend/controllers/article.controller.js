const Article = require("../models/article.model");

exports.findAll = async (req, res) => {
    try {
        const articles = await Article.find().populate({
            path: "category",
            select: "title",
        });
        return res.json(articles);
    } catch (err) {
        return res.status(400).json(err);
    }
};
