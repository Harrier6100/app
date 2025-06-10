import { computed } from 'vue';
import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLoading = () => {
    const loadingStore = useLoadingStore();

    const isLoading = computed(() => {
        return loadingStore.isLoading;
    });

    const startLoading = () => {
        loadingStore.startLoading();
    };

    const stopLoading = () => {
        loadingStore.stopLoading();
    };

    return {
        isLoading,
        startLoading,
        stopLoading,
    };
};