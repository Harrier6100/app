import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
    baseURL,
    timeout: 60000,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        // デバッグ
        if (import.meta.env.DEV) {
            console.log('[API Request]', config.method.toUpperCase(), config.url, config.data || '');
        }

        const token = localStorage.getItem('token');
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => {
        // デバッグ
        if (import.meta.env.DEV) {
            console.log('[API Response]', response.status, response.config.url, response.data);
        }

        return response;
    },
    (error) => {
        // デバッグ
        if (import.meta.env.DEV) {
            console.error('[API Error]', error.response?.status, error.response?.config.url, error.response?.data || error.message);
        }

        if (error.response) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    },
);