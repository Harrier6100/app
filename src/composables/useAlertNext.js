import { ref } from 'vue';

export const useAlert = () => {
    const alert = ref({});
    const colorMap = {
        success: 'alert-success',
        error: 'alert-danger',
        info: 'alert-info',
    };

    const setAlert = (message, color = 'info') => {
        alert.value = { isShow: true, message, color: colorMap[color] };
    };

    const clearAlert = () => {
        alert.value = {};
    };

    return {
        alert,
        setAlert,
        clearAlert,
    };
};