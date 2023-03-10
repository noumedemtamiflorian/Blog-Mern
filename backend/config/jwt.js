const jwt = require("jsonwebtoken");

// Middleware pour vérifier le jeton d'authentification
const verifyToken = async (req, res, next) => {
    try {
        // Récupération du jeton d'authentification à partir du header de la requête
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        // Vérification de la présence du jeton
        if (!token) {
            return res.status(401).json({ message: "Accès non autorisé." });
        }

        // Vérification de la validité du jeton et récupération
        //  des informations de l'utilisateur
        const decoded = await jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Accès non autorisé." });
    }
};

// Middleware pour vérifier l'authentification de l'utilisateur
const requireAuth = [verifyToken];

// Middleware pour vérifier si l'utilisateur est administrateur
const requireAdmin = [
    verifyToken,
    (req, res, next) => {
        // Vérification du rôle de l'utilisateur
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message:
                    "Accès interdit : cette opération requiert un compte administrateur.",
            });
        }
        next();
    },
];

// Exportation des middlewares
module.exports = { requireAuth, requireAdmin };
