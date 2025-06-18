<template>
    <div class="alert alert-dismissible" :class="alert.color" role="alert">
        {{ alert.message }}
        <button class="btn-close" @click="close"></button>
    </div>
</template>

<script setup>
const props = defineProps({
    alert: Object,
});
const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};
</script>