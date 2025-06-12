import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
    const authStore = useAuthStore();
    const { isAuth } = storeToRefs(authStore);
    const { authLogin, authAutoLogin, authLogout } = authStore;

    return {
        isAuth,
        authLogin,
        authAutoLogin,
        authLogout,
    };
};