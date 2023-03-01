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
    const categories = await axios.get(URL_CATEGORY);
    return categories;
};
