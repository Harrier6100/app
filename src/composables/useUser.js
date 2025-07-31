import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';

export const useUser = () => {
    const userStore = useUserStore();
    const { user, name, role, permissions } = storeToRefs(userStore);
    const { hasPermission, fetchUser, clearUser } = userStore;

    return {
        user,
        name,
        role,
        permissions,
        hasPermission,
        fetchUser,
        clearUser,
    };
};