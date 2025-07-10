import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/services/api';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    const name = computed(() => {
        return user.value?.name ?? '';
    });

    const role = computed(() => {
        return user.value?.role ?? '';
    });

    const permissions = computed(() => {
        return user.value?.permissions ?? [];
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
        name,
        role,
        permissions,
        fetchUser,
        clearUser,
    };
});