import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/libs/api';

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

    const hasPermission = (permission) => {
        return role.value === 'admin' || permissions.value.includes(permission);
    };

    const fetchUser = async () => {
        try {
            const response = await api.get('/api/auth/me');
            user.value = response.data;
        } catch (error) {
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
        hasPermission,
        fetchUser,
        clearUser,
    };
});