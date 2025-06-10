import { computed } from 'vue';
import { useConfirmStore } from '@/stores/useConfirmStore';

export const useConfirm = () => {
    const confirmStore = useConfirmStore();

    const isShow = computed(() => {
        return confirmStore.isShow;
    });

    const message = computed(() => {
        return confirmStore.message;
    });

    const confirm = (msg) => {
        return confirmStore.confirm(msg);
    };

    const confirmYes = () => {
        confirmStore.confirmYes();
    };

    const confirmNo = () => {
        confirmStore.confirmNo();
    };

    return {
        isShow,
        message,
        confirm,
        confirmYes,
        confirmNo,
    };
};