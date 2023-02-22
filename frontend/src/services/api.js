import axios from "axios";
import { URL_ARTICLE } from "../utils/constants/urls";

export const getCategories = async () => {
    try {
        const articles = await axios.get(URL_ARTICLE);
        return articles;
    } catch (error) {
        return error.response;
    }
};
