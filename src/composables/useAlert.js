import { ref } from 'vue';

export const useAlert = () => {
    const alerts = ref([]);

    const addAlert = (message, type = 'info', duration = 5000) => {
        const id = Date.now();
        alerts.value.push({ id, message, type });
        setTimeout(() => removeAlert(id), duration);
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