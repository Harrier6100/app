import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
    const authStore = useAuthStore();
    const { isAuth } = storeToRefs(authStore);

    const signin = async (credentials) => {
        return await authStore.signin(credentials);
    };

    const autoSignin = async () => {
        return await authStore.autoSignin();
    };

    const signout = async () => {
        return await authStore.signout();
    };

    return {
        isAuth,
        signin,
        autoSignin,
        signout,
    };
};