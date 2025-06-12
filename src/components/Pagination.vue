<template>
    <div class="d-flex justify-content-end" v-if="props.pageLength !== 0">
        <button
            type="button"
            class="btn btn-link text-decoration-none"
            @click="decrement"
            :disabled="props.page === 1"
        >
            <i class="bi bi-chevron-left"></i>
        </button>
        <template v-for="page in pages" :key="page">
            <button v-if="page === '...'"
                type="button"
                class="btn btn-link text-decoration-none"
                :disabled="true"
            >
                ...
            </button>
            <button v-if="page !== '...'"
                type="button"
                :class="['btn', 'btn-link', 'text-decoration-none', page === props.page ? 'text-dark' : 'text-primary' ]"
                @click="emit('update:page', page)"
                :disabled="page === props.page"
            >
                {{ page }}
            </button>
        </template>
        <button
            type="button"
            class="btn btn-link text-decoration-none"
            @click="increment"
            :disabled="props.page >= props.pageLength"
        >
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        default: 1,
    },
    pageLength: {
        type: Number,
        default: 0,
    },
});
const emit = defineEmits(['update:page']);

const decrement = () => {
    const page = props.page - 1;
    emit('update:page', page);
};

const increment = () => {
    const page = props.page + 1;
    emit('update:page', page);
};

const pages = computed(() => {
    const pageLength = props.pageLength;
    const page = props.page;
    const pages = [];

    if (pageLength <= 5) {
        for (let i=1; i<=pageLength; i++) {
            pages.push(i);
        }
    } else {
        if (pageLength <= 7) {
            for (let i=1; i<=pageLength; i++) {
                pages.push(i);
            }
        } else if (page <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', pageLength);
        } else if (page >= pageLength - 3) {
            pages.push(1, '...', pageLength - 4, pageLength - 3, pageLength - 2, pageLength - 1, pageLength);
        } else {
            pages.push(1, '...', page - 1, page, page + 1, '...', pageLength);
        }
    }

    return pages;
});
</script>