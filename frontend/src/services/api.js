// Importation de la bibliothèque axios pour effectuer des requêtes HTTP
import axios from "axios";
// Importation de l'URL de l'API pour les catégories
import { URL_CATEGORY } from "../utils/constants/urls";
// Fonction qui permet de récupérer toutes les catégories
export const getCategories = async () => {
    try {
        // Effectue une requête GET sur l'URL de l'API pour récupérer toutes les catégories
        const categories = await axios.get(URL_CATEGORY);
        // Retourne les catégories récupérées
        return categories;
    } catch (error) {
        // Si une erreur est survenue, renvoie la réponse d'erreur de la requête HTTP
        return error.response;
    }
};

// Fonction qui permet d'ajouter une catégorie
export const postCategory = async (category) => {
    try {
        // Effectue une requête POST sur l'URL de l'API pour ajouter une catégorie
        const response = await axios.post(URL_CATEGORY, category);
        // Retourne la réponse de la requête HTTP
        return response;
    } catch (error) {
        // Si une erreur est survenue, renvoie la réponse d'erreur de la requête HTTP
        return error.response;
    }
};

export const putApiCategory = async (category) => {
    const { title, _id } = category;
    try {
        const response = await axios.put(`${URL_CATEGORY}/${_id}`, {
            title,
        });
        return response;
    } catch (error) {
        return error.response;
    }
};
