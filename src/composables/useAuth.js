import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
    const authStore = useAuthStore();
    const { isAuth } = storeToRefs(authStore);
    const { login, autoLogin, logout } = authStore;

    return {
        isAuth,
        login,
        autoLogin,
        logout,
    };
};