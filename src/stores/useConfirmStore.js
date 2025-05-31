import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfirmStore = defineStore('confirm', () => {
    const isOpen = ref(false);
    const message = ref('');
    let resolveFn = null;

    const open = (msg) => {
        message.value = msg;
        isOpen.value = true;
        return new Promise((resolve) => {
            resolveFn = resolve;
        });
    };

    const confirm = () => {
        isOpen.value = false;
        resolveFn?.(true);
        resolveFn = null;
    };

    const cancel = () => {
        isOpen.value = false;
        resolveFn?.(false);
        resolveFn = null;
    };

    return {
        isOpen,
        message,
        open,
        confirm,
        cancel,
    };
});