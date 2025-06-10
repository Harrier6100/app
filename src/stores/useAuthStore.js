import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false);

    const signin = async (credentials) => {
        try {
            const response = await api.post(`/api/signin`, credentials);
            const { token } = response.data;
            localStorage.setItem('token', token);
            isAuth.value = true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const autoSignin = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await api.post(`/api/signin/auto`);
            const { token: newToken } = response.data;
            localStorage.setItem('token', newToken);
            isAuth.value = true;
        } catch (error) {
            signout();
        }
    };

    const signout = async () => {
        try {
            await api.post(`/api/signout`);
        } catch (error) {
            console.error(error);
        }
        localStorage.removeItem('token');
        isAuth.value = false;
    };

    return {
        isAuth,
        signin,
        autoSignin,
        signout,
    };
});