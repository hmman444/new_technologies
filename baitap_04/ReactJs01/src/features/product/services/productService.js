import axios from "../../../utils/axios.customize";

export const getProductsApi = (params = {}) => axios.get("/v1/api/product", { params });
export const getProductDetailApi = (id) => axios.get(`/v1/api/product/${id}`);
export const toggleWishlistApi = (productId) => axios.post("/v1/api/product/wishlist/toggle", { productId });
export const getWishlistApi = () => axios.get("/v1/api/product/wishlist");