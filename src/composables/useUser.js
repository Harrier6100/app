import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';

export const useUser = () => {
    const userStore = useUserStore();
    const { user, name, role, permissions } = storeToRefs(userStore);
    const { fetchUser, clearUser } = userStore;

    return {
        user,
        name,
        role,
        permissions,
        fetchUser,
        clearUser,
    };
};