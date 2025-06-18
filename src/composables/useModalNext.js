import { ref } from 'vue';

export const useModal = () => {
    const _isOpen = ref(false);
    const _payload = ref(null);

    const open = (data = null) => {
        _isOpen.value = true;
        _payload.value = data;
    };

    const close = () => {
        _isOpen.value = false;
        _payload.value = null;
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