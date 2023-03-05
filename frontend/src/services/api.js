import axios from "axios";
import { URL_CATEGORY } from "../utils/constants/urls";
import { URL_ARTICLE } from "../utils/constants/urls";

export const getCategories = async () => {
    try {
        const categories = await axios.get(URL_CATEGORY);
        return categories;
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
        const deleteCategory = await axios.delete(`${URL_CATEGORY}/${id}`);
        return deleteCategory;
    } catch (error) {
        return error;
    }
};

export const getArticles = async () => {
    try {
        const articles = await axios.get(URL_ARTICLE);
        return articles;
    } catch (error) {
        return error.response;
    }
};

export const postArticle = async (data) => {
    try {
        const response = await axios.post(URL_ARTICLE, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const putArticle = async (data) => {
    try {
        const response = await axios.put(`${URL_ARTICLE}/${data._id}`, data);
        return response;
    } catch (error) {
        return error;
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
