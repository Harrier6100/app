import { storeToRefs } from 'pinia';
import { useConfirmStore } from '@/stores/useConfirmStore';

export const useConfirm = () => {
    const confirmStore = useConfirmStore();
    const { isShow, message } = storeToRefs(confirmStore);
    const { confirm, confirmYes, confirmNo } = confirmStore;

    return {
        isShow,
        message,
        confirm,
        confirmYes,
        confirmNo,
    };
};