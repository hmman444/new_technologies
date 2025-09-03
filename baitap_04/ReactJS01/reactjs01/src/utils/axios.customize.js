import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// request interceptor
instance.interceptors.request.use(
    function (config) {
        // Nếu route là /product hoặc /product/:id thì không gửi token
        const publicRoutes = ["/product", "/product/"];
        if (!publicRoutes.some(path => config.url.startsWith(path))) {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// response interceptor
instance.interceptors.response.use(
    function (response) {
        if (response && response.data) return response.data;
        return response;
    },
    function (error) {
        if (error?.response?.data) return Promise.reject(error.response.data);
        return Promise.reject(error);
    }
);

export default instance;