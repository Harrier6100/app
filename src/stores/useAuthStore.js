import { defineStore } from 'pinia';
import api from '@/services/api';
import { useUserStore } from '@/stores/useUserStore';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
    }),
    actions: {
        async signin(credentials) {
            try {
                const response = await api.post('api/signin', credentials);
                const { token } = response.data;
                this.isAuth = true;
                localStorage.setItem('token', token);

                const user = useUserStore();
                await user.fetchUser();
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async autoSignin() {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await api.post('/api/signin/auto');
                const { token: newToken } = response.data;
                localStorage.setItem('token', newToken);
                this.isAuth = true;

                const user = useUserStore();
                await user.fetchUser();
            } catch (error) {
                this.signout();
            }
        },
        async signout() {
            try {
                await api.post('/api/signout');
            } catch (error) {
                console.error(error);
            }
            this.isAuth = false;
            localStorage.removeItem('token');

            const user = useUserStore();
            user.clearUser();
        },
    },
});