<template>
    <div v-if="isShow" :class="classes">{{ message }}</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    success: String,
    error: String,
});

const isShow = computed(() => {
    return props.success || props.error;
});

const message = computed(() => {
    return props.success || props.error;
});

const classes = computed(() => {
    const classList = ['form-text'];

    if (props.success) {
        classList.push('text-success');
    }

    if (props.error) {
        classList.push('text-danger');
    }

    return classList;
});
</script>