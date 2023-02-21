import axios from "axios";
import { URL_CATEGORY } from "../utils/constants/urls";

export const getCategories = async () => {
    const categories = await axios.get(URL_CATEGORY);
    return categories;
};
