<template>
    <div>
        <div v-if="props.message?.error" class="form-text text-danger">{{ props.message?.error }}</div>
        <div v-if="props.message?.success" class="form-text text-success">{{ props.message?.success }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    message: String,
});
</script>