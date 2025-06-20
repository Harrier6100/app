<template>
    <button class="btn-close" @click="close"></button>
</template>

<script setup>
const emit = defineEmits(['close']);
const close = () => {
    emit('close');
};
</script>