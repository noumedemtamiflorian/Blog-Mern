import axios from "axios";
import { URL_ARTICLE, URL_CATEGORY } from "../utils/constants/urls";

export const getArticles = async () => {
    try {
        const articles = await axios.get(URL_ARTICLE);
        return articles;
    } catch (error) {
        return error.response;
    }
};

export const getCategories = async () => {
    try {
        const categories = await axios.get(URL_CATEGORY);
        return categories;
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
