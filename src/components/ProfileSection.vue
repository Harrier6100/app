<template>
    <div>
        <div class="border-top py-3" role="button" @click="props.toggle">
            <div class="d-flex">
                <div class="me-auto">
                    <a class="text-dark text-decoration-none">{{ props.label }}</a>
                </div>
                <i :class="props.isOpen ? 'bi bi-chevron-down' : 'bi bi-chevron-right'"></i>
            </div>
        </div>
        <div v-if="props.isOpen">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    label: String,
    isOpen: Boolean,
    toggle: Function,
});
</script>