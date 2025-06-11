import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/services/api';

export const useAuthUserStore = defineStore('authUser', () => {
    const authUser = ref(null);

    const authUserName = computed(() => {
        return authUser.value?.name ?? '';
    });

    const fetchAuthUser = async () => {
        try {
            const response = await api.get(`/api/auth/me`);
            authUser.value = response.data;
        } catch (error) {
            console.error(error);
            authUser.value = null;
        }
    };

    const clearAuthUser = () => {
        authUser.value = null;
    };

    return {
        authUser,
        authUserName,
        fetchAuthUser,
        clearAuthUser,
    };
});