import { storeToRefs } from 'pinia';
import { useAuthUserStore } from '@/stores/useAuthUserStore';

export const useAuthUser = () => {
    const authUserStore = useAuthUserStore();
    const { authUser, authUserName } = storeToRefs(authUserStore);
    const { fetchAuthUser, clearAuthUser } = authUserStore;

    return {
        authUser,
        authUserName,
        fetchAuthUser,
        clearAuthUser,
    };
};