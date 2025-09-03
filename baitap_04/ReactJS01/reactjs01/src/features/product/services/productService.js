import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const getProductsApi = async ({ page = 1, limit = 10, category = "", search = "" }) => {
    const res = await axios.get(`${API_BASE_URL}/product`, {
        params: { page, limit, category, search }
    });
    return res.data;
};