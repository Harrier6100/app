import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfirmStore = defineStore('confirm', () => {
    const isShow = ref(false);
    const message = ref('');
    let resolveFn = null;

    const confirm = (msg) => {
        message.value = msg;
        isShow.value = true;
        return new Promise((resolve) => {
            resolveFn = resolve;
        });
    };

    const confirmYes = () => {
        isShow.value = false;
        resolveFn?.(true);
        resolveFn = null;
    };

    const confirmNo = () => {
        isShow.value = false;
        resolveFn?.(false);
        resolveFn = null;
    };

    return {
        isShow,
        message,
        confirm,
        confirmYes,
        confirmNo,
    };
});