import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuthUserStore } from '@/stores/useAuthUserStore';
import { api } from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false);
    const authUserStore = useAuthUserStore();

    const authLogin = async (credentials) => {
        try {
            const response = await api.post(`/api/auth/login`, credentials);
            const { token } = response.data;
            localStorage.setItem('token', token);
            isAuth.value = true;

            await authUserStore.fetchAuthUser();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const authAutoLogin = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            isAuth.value = false;
            return;
        }

        try {
            const response = await api.post(`/api/auth/refresh`);
            const { token: newToken } = response.data;
            localStorage.setItem('token', newToken);
            isAuth.value = true;

            await authUserStore.fetchAuthUser();
        } catch (error) {
            await logout();
        }
    };

    const authLogout = async () => {
        try {
            await api.post(`/api/auth/logout`);
        } catch (error) {
            console.error(error);
        }
        localStorage.removeItem('token');
        isAuth.value = false;

        authUserStore.clearAuthUser();
    };

    return {
        isAuth,
        authLogin,
        authAutoLogin,
        authLogout,
    };
});