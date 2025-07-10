import { storeToRefs } from 'pinia';
import { useToastStore } from '@/stores/useToastStore';

export const useToast = () => {
    const toastStore = useToastStore();
    const { toasts } = storeToRefs(toastStore);
    const { addToast, removeToast } = toastStore;

    return {
        toasts,
        addToast,
        removeToast,
    };
};