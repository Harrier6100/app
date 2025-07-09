import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLoading = () => {
    const loadingStore = useLoadingStore();
    const { isLoading } = storeToRefs(loadingStore);
    const { startLoading, stopLoading } = loadingStore;

    return {
        isLoading,
        startLoading,
        stopLoading,
    };
};