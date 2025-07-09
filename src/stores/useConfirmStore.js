import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfirmStore = defineStore('confirm', () => {
    const isOpen = ref(false);
    const confirmMessage = ref('');
    let resolveFunction = null;

    const confirm = (msg) => {
        isOpen.value = true;
        confirmMessage.value = msg;
        return new Promise((resolve) => {
            resolveFunction = resolve;
        });
    };

    const confirmYes = () => {
        isOpen.value = false;
        resolveFunction?.(true);
        resolveFunction = null;
    };

    const confirmNo = () => {
        isOpen.value = false;
        resolveFunction?.(false);
        resolveFunction = null;
    };

    return {
        isOpen,
        confirmMessage,
        confirm,
        confirmYes,
        confirmNo,
    };
});