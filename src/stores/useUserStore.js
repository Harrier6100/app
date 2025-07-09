import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/services/api';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    const userName = computed(() => {
        return user.value?.name ?? '';
    });

    const fetchUser = async () => {
        try {
            const response = await api.get(`/api/auth/me`);
            user.value = response.data;
        } catch (error) {
            console.error(error);
            user.value = null;
        }
    };

    const clearUser = () => {
        user.value = null;
    };

    return {
        user,
        userName,
        fetchUser,
        clearUser,
    };
});