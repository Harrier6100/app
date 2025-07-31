import { ref } from 'vue';

export const useAsync = () => {
    const isSpinning = ref(false);

    const execute = async (fn) => {
        isSpinning.value = true;

        try {
            return await fn();
        } finally {
            isSpinning.value = false;
        }
    };

    return {
        isSpinning,
        execute,
    };
};