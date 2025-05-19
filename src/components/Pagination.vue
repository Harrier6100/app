<template>
    <div class="d-flex justify-content-end">
        <button class="btn btn-link py-0" @click="prevPage" :disabled="props.page === 1">
            <i class="bi bi-chevron-left"></i>
        </button>
        <div class="mx-2">{{ props.page }} - {{ props.pages }}</div>
        <button class="btn btn-link py-0" @click="nextPage" :disabled="page === pages">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        default: 1,
    },
    pages: {
        type: Number,
        default: 0,
    },
});
const emit = defineEmits(['prevPage', 'nextPage']);

const prevPage = () => {
    emit('prevPage');
};

const nextPage = () => {
    emit('nextPage');
};
</script>