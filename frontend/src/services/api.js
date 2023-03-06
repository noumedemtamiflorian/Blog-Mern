import axios from "axios";
import {
    URL_CATEGORY,
    URL_ARTICLE,
    URL_COMMENT,
} from "../utils/constants/urls";

// Categorie

export const getCategories = async () => {
    try {
        const response = await axios.get(URL_CATEGORY);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getCategory = async (_id) => {
    try {
        const response = await axios.get(`${URL_CATEGORY}/${_id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const postCategory = async (category) => {
    try {
        const response = await axios.post(URL_CATEGORY, category);
        return response;
    } catch (error) {
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

export const deleteApiCategory = async (id) => {
    try {
        const response = await axios.delete(`${URL_CATEGORY}/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

// article

export const getArticles = async () => {
    try {
        const response = await axios.get(URL_ARTICLE);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const getArticle = async (_id) => {
    try {
        const response = await axios.get(URL_ARTICLE + "/" + _id);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const postArticle = async (data) => {
    try {
        const response = await axios.post(URL_ARTICLE, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const putArticle = async (data) => {
    try {
        const response = await axios.put(`${URL_ARTICLE}/${data._id}`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteArticle = async (id) => {
    try {
        const deleteArticle = await axios.delete(`${URL_ARTICLE}/${id}`);
        return deleteArticle;
    } catch (error) {
        return error.response;
    }
};

// Comment
export const postComment = async (data) => {
    try {
        const response = await axios.post(URL_COMMENT, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const editComemnt = async (id, data) => {
    try {
        const response = await axios.put(URL_COMMENT + "/" + id, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const deleteComment = async (_id) => {
    try {
        const response = await axios.delete(URL_COMMENT + "/" + _id);
        return response;
    } catch (error) {
        return error;
    }
};
