import { ref } from 'vue';

export const useModal = () => {
    const _isOpen = ref(false);
    const _payload = ref(null);

    const open = (data = null) => {
        _payload.value = data;
        _isOpen.value = true;
    };

    const close = () => {
        _payload.value = null;
        _isOpen.value = false;
    };

    return {
        open,
        close,
        get isOpen() {
            return _isOpen.value;
        },
        get payload() {
            return _payload.value;
        },
    };
};