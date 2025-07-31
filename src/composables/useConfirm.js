import { storeToRefs } from 'pinia';
import { useConfirmStore } from '@/stores/useConfirmStore';

export const useConfirm = () => {
    const confirmStore = useConfirmStore();
    const { isOpen, confirmMessage } = storeToRefs(confirmStore);
    const { confirm, confirmYes, confirmNo } = confirmStore;

    return {
        isOpen,
        confirmMessage,
        confirm,
        confirmYes,
        confirmNo,
    };
};