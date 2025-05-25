<template>
    <div v-if="show" :class="['form-text', type]">
        {{ message }}
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    error: String,
    success: String,
});

const show = computed(() => {
    return props.error || props.success;
});

const message = computed(() => {
    return props.error || props.success;
});

const type = computed(() => {
    if (props.error) {
        return 'text-danger';
    }
    if (props.success) {
        return 'text-success';
    }
    return '';
});
</script>