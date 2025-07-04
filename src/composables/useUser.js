import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';

export const useUser = () => {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    return {
        user,
    };
};