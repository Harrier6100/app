import { ref } from 'vue';

export const useAlert = () => {
    const alerts = ref([]);

    const colorMap = {
        success: 'bg-success',
        error: 'bg-danger',
        info: 'bg-info',
    };

    const addAlert = (message, color = 'info', timeout = 5000) => {
        const id = Date.now();
        const normalizedColor = colorMap[color];
        alerts.value.push({ id, message, color: normalizedColor, timeout });
        setTimeout(() => removeAlert(id), timeout);
    };

    const removeAlert = (id) => {
        alerts.value = alerts.value.filter(alert => alert.id !== id);
    };

    return {
        alerts,
        addAlert,
        removeAlert,
    };
};