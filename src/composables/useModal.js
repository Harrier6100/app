import { ref } from 'vue';

export const useModal = () => {
    const isOpen = ref(false);
    const payload = ref(null);

    const open = (data = null) => {
        payload.value = data;
        isOpen.value = true;
    };

    const close = () => {
        payload.value = null;
        isOpen.value = false;
    };

    return {
        isOpen,
        payload,
        open,
        close,
    };
};