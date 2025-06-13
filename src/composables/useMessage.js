import { ref } from 'vue';

export const useMessage = () => {
    const message = ref({});

    const clearMessage = (msg = {}) => {
        message.value = msg;
    };

    return {
        message,
        clearMessage,
    };
};