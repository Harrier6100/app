import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    const fetchUser = async () => {
        try {
            const response = await api.get('/api/profile');
            user.value = response.data;
        } catch (error) {
            console.error(error);
            user.value = null;
        }
    };

    const clearUser = () => {
        user.value = null;
    };

    const userName = computed(() => {
        return user.value?.name ?? '';
    });

    return {
        user,
        fetchUser,
        clearUser,
        userName,
    };
});