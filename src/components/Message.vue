<template>
    <div v-if="isShow" :class="['form-text', color]">{{ message }}</div>
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

const color = computed(() => {
    if (props.success) {
        return 'text-success';
    }
    if (props.error) {
        return 'text-danger';
    }
    return '';
});
</script>