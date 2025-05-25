<template>
    <div class="d-flex justify-content-end">
        <button class="btn btn-link py-0" type="button" @click="prevPage" :disabled="props.currentPage === 1">
            <i class="bi bi-chevron-left"></i>
        </button>
        <div class="mx-2">{{ props.currentPage }} - {{ props.totalPage }}</div>
        <button class="btn btn-link py-0" type="button" @click="nextPage" :disabled="props.currentPage === props.totalPage">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1,
    },
    totalPage: {
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