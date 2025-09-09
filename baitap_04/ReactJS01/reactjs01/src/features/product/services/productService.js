// src/features/product/services/productService.js
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const getProductsApi = async ({ 
    page = 1,
    limit = 10,
    category = "",
    search = "",
    filter = ""
}) => {
    const res = await axios.get(`${API_BASE_URL}/product`, {
        params: { page, limit, category, search, filter }
    });
    return res.data;
};

export const getCategoriesApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/product/categories/all`);
    return res.data;
};