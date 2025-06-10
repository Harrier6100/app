import { ref } from 'vue';

export const useToast = () => {
    const toasts = ref([]);

    const colorMap = {
        success: 'bg-success',
        error: 'bg-danger',
        info: 'bg-info',
    };

    const addToast = (message, color = 'info', timeout = 5000) => {
        const id = Date.now();
        const normalizedColor = colorMap[color];
        toasts.value.push({ id, message, color: normalizedColor, timeout });
        setTimeout(() => removeToast(id), timeout);
    };

    const removeToast = (id) => {
        toasts.value = toasts.value.filter(toast => toast.id !== id);
    };

    return {
        toasts,
        addToast,
        removeToast,
    };
};