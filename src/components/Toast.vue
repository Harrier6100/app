<template>
        <div class="toast-container position-fixed bottom-0 start-0 p-3">
            <div v-for="toast in props.toasts" :key="toast.id"
                class="toast align-items-center text-white bg-opacity-75 border-0 show"
                :class="toast.color"
                role="alert"
            >
                <div class="d-flex">
                    <div class="toast-body">{{ toast.message }}</div>
                    <button class="btn-close btn-close-white m-auto me-2" @click="close(toast.id)"></button>
                </div>
            </div>
        </div>
</template>

<script setup>
const props = defineProps({
    toasts: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['close']);
const close = (id) => {
    emit('close', id);
};
</script>

<style scoped>
.toast {
  --bs-toast-spacing: 1rem;
}
</style>