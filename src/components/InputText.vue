<template>
    <input
        class="form-control"
        type="text"
        v-bind="attrs"
        v-model="model"
        @keydown.enter="$emit('enter')"
    />
</template>

<script setup>
import { useAttrs, ref, watch } from 'vue';

const attrs = useAttrs();
const model = defineModel();
const emit = defineEmits(['enter']);
</script>