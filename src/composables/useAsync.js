import { ref } from 'vue';

export const useAsync = () => {
    const isAsync = ref(false);
    const error = ref(null);

    const execute = async (asyncFunction) => {
        isAsync.value = true;
        error.value = null;

        try {
            const res = await asyncFunction();
            return res;
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            isAsync.value = false;
        }
    };

    return {
        isAsync,
        error,
        execute,
    };
};