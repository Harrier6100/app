import { defineStore } from 'pinia';
import api from '@/services/api';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async fetchUser() {
            try {
                const response = await api.get('/api/profile');
                this.user = response.data;
            } catch (error) {
                console.error(error);
                this.user = null;
            }
        },
        clearUser() {
            this.user = null;
        },
    },
    getters: {
        userName: (state) => state.user?.name ?? '',
    },
});