import axios from 'axios';
import { BASE_URL } from '@/env/config';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    withCredentials: true,
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;

        }

        return config;
    },
    error => Promise.reject(error),
);

api.interceptors.response.use(
    response => response,
    async (error) => {
        const { response } = error;
        if (response) {
            return Promise.reject(response.data);
        }

        return Promise.reject(error);
    },
);