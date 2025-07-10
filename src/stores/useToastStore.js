import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);
    const colorMap = {
        success: 'bg-success',
        error: 'bg-danger',
        info: 'bg-info',
    };

    const addToast = (message, color, delay = 5000) => {
        const id = Date.now();
        toasts.value.unshift({ id, message, color: colorMap[color] || colorMap.info, delay });
        setTimeout(() => removeToast(id), delay);
    };

    const removeToast = (id) => {
        toasts.value = toasts.value.filter(toast => toast.id !== id);
    };

    return {
        toasts,
        addToast,
        removeToast,
    };
});