<template>
    <div v-if="wrap" class="d-grid">
        <button class="btn btn-primary" :disabled="isLoading">
            <span v-if="isAsync" class="spinner-border spinner-border-sm me-1"></span>
            <slot></slot>
        </button>
    </div>
    <button v-else class="btn btn-primary" :disabled="isLoading">
        <span v-if="isAsync" class="spinner-border spinner-border-sm me-1"></span>
        <slot></slot>
    </button>
</template>

<script setup>
import { useLoading } from '@/composables/useLoading';

const props = defineProps({
    wrap: Boolean,
    isAsync: Boolean,
});
const { isLoading } = useLoading();
</script>