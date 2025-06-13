<template>
    <div class="toast-container position-fixed bottom-0 start-0 p-3">
        <div
            v-for="alert in alerts"
            :key="alert.id"
            :class="['toast align-items-center text-white bg-opacity-75 border-0 show', alert.color]"
            role="alert"
        >
            <div class="d-flex">
                <div class="toast-body">
                    {{ alert.message }}
                </div>
                <button
                    class="btn-close btn-close-white me-2 m-auto"
                    type="button"
                    @click="removeAlert(alert.id)"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    alerts: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['removeAlert']);

const removeAlert = (id) => {
    emit('removeAlert', id);
};
</script>