// Importe la bibliothèque Axios pour effectuer des appels HTTP
import axios from "axios";

// Importe les constantes d'URL de l'API à partir du fichier "urls.js"
import {
    URL_CATEGORY,
    URL_ARTICLE,
    URL_COMMENT,
} from "../utils/constants/urls";

// articles

// Récupère toutes les catégories
export const getCategories = async () => {
    try {
        const response = await axios.get(URL_CATEGORY);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant le
        // message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Récupère une catégorie en particulier en fonction de son ID
export const getCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${URL_CATEGORY}/${categoryId}`);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant le
        // message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Crée une nouvelle catégorie
export const postCategory = async (category) => {
    try {
        const response = await axios.post(URL_CATEGORY, category);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant le
        // message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Met à jour une catégorie existante
export const putApiCategory = async (category) => {
    const { title, _id } = category;
    try {
        const response = await axios.put(`${URL_CATEGORY}/${_id}`, { title });
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant le
        // message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Supprime une catégorie existante en fonction de son ID
export const deleteApiCategory = async (id) => {
    try {
        const response = await axios.delete(`${URL_CATEGORY}/${id}`);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// articles

// Récupère tous les articles
export const getArticles = async () => {
    try {
        const response = await axios.get(URL_ARTICLE);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Récupère un article spécifique en fonction de son ID
export const getArticle = async (id) => {
    try {
        const response = await axios.get(`${URL_ARTICLE}/${id}`);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Crée un nouvel article
export const postArticle = async (data) => {
    try {
        const response = await axios.post(URL_ARTICLE, data);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Met à jour un article existant
export const putArticle = async (data) => {
    try {
        const response = await axios.put(`${URL_ARTICLE}/${data._id}`, data);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Supprime un article en fonction de son ID
export const deleteArticle = async (id) => {
    try {
        const response = await axios.delete(`${URL_ARTICLE}/${id}`);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Comment

// Fonction pour poster un commentaire
export const postComment = async (data) => {
    try {
        const response = await axios.post(URL_COMMENT, data);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Fonction pour modifier un commentaire
export const editComemnt = async (id, data) => {
    try {
        const response = await axios.put(`${URL_COMMENT}/${id}`, data);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};

// Fonction pour supprimer un commentaire
export const deleteComment = async (_id) => {
    try {
        const response = await axios.delete(`${URL_COMMENT}/${_id}`);
        return response;
    } catch (error) {
        // En cas d'erreur, on lance une nouvelle erreur contenant
        // le message d'erreur renvoyé par l'API
        throw new Error(error.response);
    }
};
