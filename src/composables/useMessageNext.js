import { ref, reactive } from 'vue';

export const useMessage = () => {
    const successMessage = ref({});
    const errorMessage = reactive({});

    const clearMessage = () => {
        successMessage.value = {};
        errorMessage.value = {};
    };

    return {
        successMessage,
        errorMessage,
        clearMessage,
    };
};