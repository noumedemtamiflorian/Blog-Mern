// Importer le module axios depuis la bibliothèque "axios"
import axios from "axios";
// Importer les URL d'article et de catégorie à partir du fichier de constantes d'URL
import { URL_ARTICLE, URL_CATEGORY } from "../utils/constants/urls";

// fonction pour recuperer les articles
export const getArticles = async () => {
    try {
        // Envoyer une requête GET à l'URL d'article et attendre la réponse
        const articles = await axios.get(URL_ARTICLE);

        // Retourner les articles récupérés
        return articles;
    } catch (error) {
        // Si une erreur se produit lors de la récupération des articles,
        //  renvoyer la réponse d'erreur
        return error.response;
    }
};

// Exporter une fonction asynchrone nommée "getCategories"
// qui récupère les catégories à travers l'API
export const getCategories = async () => {
    try {
        // Faire une requête GET à l'URL de la catégorie en utilisant
        // axios et attendre la réponse
        const categories = await axios.get(URL_CATEGORY);
        // Retourner les catégories récupérées
        return categories;
    } catch (error) {
        // Si une erreur se produit, retourner la réponse d'erreur
        return error.response;
    }
};

// Exporter une fonction asynchrone nommée postArticle qui
// prend un objet de données en paramètre
export const postArticle = async (data) => {
    try {
        // Utiliser la méthode axios.post pour envoyer une requête
        // POST à l'URL d'article avec les données fournies
        const response = await axios.post(URL_ARTICLE, data);
        // Retourner la réponse du serveur si la requête est réussie
        return response;
    } catch (error) {
        // Si la requête échoue, retourner l'erreur associée
        return error;
    }
};

// Fonction asynchrone qui permet de mettre à jour un article via l'API
export const putArticle = async (data) => {
    try {
        // Envoyer une requête PUT à l'URL de l'article en utilisant l'ID de l'article
        // et les données fournies en paramètre
        const response = await axios.put(`${URL_ARTICLE}/${data._id}`, data);
        // Renvoyer la réponse de la requête
        return response;
    } catch (error) {
        // Si une erreur se produit, renvoyer l'erreur
        return error;
    }
};

// Définir une fonction asynchrone qui supprime un article en utilisant l'ID de l'article
export const deleteArticle = async (id) => {
    try {
        // Utiliser la méthode delete de l'objet axios pour envoyer une requête DELETE
        // à l'URL de l'article avec l'ID spécifié
        const deleteArticle = await axios.delete(`${URL_ARTICLE}/${id}`);
        // Retourner la réponse de la requête DELETE si elle a réussi
        return deleteArticle;
    } catch (error) {
        // Retourner la réponse d'erreur de la requête DELETE si elle a échoué
        return error.response;
    }
};
