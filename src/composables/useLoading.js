import { computed } from 'vue';
import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLoading = () => {
    const loading = useLoadingStore();

    const isLoading = computed(() => {
        return loading.isLoading;
    });

    const startLoading = () => {
        loading.startLoading();
    };

    const stopLoading = () => {
        loading.stopLoading();
    };

    return {
        isLoading,
        startLoading,
        stopLoading,
    };
};