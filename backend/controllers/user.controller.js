const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const bcrypt = require("bcryptjs");

exports.findAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { userId } = req.user;

        // Vérifie si l'utilisateur existe
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifie si l'utilisateur est autorisé à modifier
        if (userId !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to modify this user",
            });
        }

        // Met à jour l'utilisateur
        const userUpdated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // retourne le nouvel utilisateur mis à jour
        );

        return res.json(userUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { userId, role } = req.user;
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res
                .status(403)
                .json({ message: "Cannot delete administrator" });
        }

        if (role !== "admin" && userId !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to modify this user",
            });
        }

        const deletedUser = await User.findByIdAndDelete(user._id);
        await Comment.deleteMany({ user: deletedUser._id });

        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { userId } = req.user;
        const { email, password } = req.body;

        // Vérifie si l'email correspond à un utilisateur existant
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Vérifie si l'utilisateur est autorisé à réinitialiser son propre mot de passe
        if (userId !== user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Hash le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Met à jour le mot de passe de l'utilisateur dans la base de données
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        return res.status(200).json({ message: "Password has been reset" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
