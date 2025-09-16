import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// request interceptor
instance.interceptors.request.use(
    function (config) {
        const isGet = config.method === "get";
        const url = config.url.startsWith("/") ? config.url : `/${config.url}`;

        const publicRoutes = ["/product", "/product/"];

        if (isGet && publicRoutes.some(path => url.startsWith(path))) {
        return config; // GET list/detail thì public
        }

        const token = localStorage.getItem("access_token");
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("👉 Attach token:", token, "for", url);
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