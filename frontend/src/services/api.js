import axios from "axios";
import { URL_CATEGORY } from "../utils/constants/urls";

export const getCategories = async () => {
    try {
        const categories = await axios.get(URL_CATEGORY);
        return categories;
    } catch (error) {
        return error;
    }
};

export const getCategory = async (_id) => {
    try {
        const categories = await axios.get(URL_CATEGORY + "/" + _id);
        return categories;
    } catch (error) {
        return error;
    }
};
