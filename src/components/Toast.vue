<template>
    <div class="toast-container position-fixed bottom-0 start-0 p-3">
        <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="['toast align-items-center text-white bg-opacity-75 border-0 show', toast.color]"
            role="alert"
        >
            <div class="d-flex">
                <div class="toast-body">
                    {{ toast.message }}
                </div>
                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    @click="removeToast(toast.id)"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    toasts: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['removeToast']);

const removeToast = (id) => {
    emit('removeToast', id);
};
</script>