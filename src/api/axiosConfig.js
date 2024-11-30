import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend-proyecto-final-xuul.onrender.com',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('proyectoFinalToken');
        if (token) {
            config.headers['x-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
