import { ref } from 'vue';

export const useMessage = () => {
    const successMessage = ref({});
    const errorMessage = ref({});

    return {
        successMessage,
        errorMessage,
    };
};