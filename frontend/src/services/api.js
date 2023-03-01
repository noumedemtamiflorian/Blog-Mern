import axios from "axios";
import { URL_ARTICLE } from "../utils/constants/urls";

export const getArticle = async (_id) => {
    try {
        const articles = await axios.get(URL_ARTICLE + "/" + _id);
        return articles;
    } catch (error) {
        return error.response;
    }
};
