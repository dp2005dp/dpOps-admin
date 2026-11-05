import axios from "axios";

const Axios = axios.create({
    baseURL : import.meta.env.VITE_APIURl,   
    timeout: 30000
})

// Automatically attach JWT to every request
Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default Axios