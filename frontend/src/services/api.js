import axios from "axios";
import { URL_ARTICLE, URL_COMMENT } from "../utils/constants/urls";

export const getArticle = async (_id) => {
    try {
        const articles = await axios.get(URL_ARTICLE + "/" + _id);
        return articles;
    } catch (error) {
        return error.response;
    }
};

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
