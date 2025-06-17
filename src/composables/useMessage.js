import { ref } from 'vue';

export const useMessage = () => {
    const message = ref({});
    const successMessage = ref({});
    const errorMessage = ref({});

    const clearMessage = (msg = {}) => {
        message.value = msg;
    };

    return {
        message,
        successMessage,
        errorMessage,
        clearMessage,
    };
};