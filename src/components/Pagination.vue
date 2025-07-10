<template>
    <div class="d-flex justify-content-end">
        <button
            class="btn btn-link text-decoration-none"
            @click="page = props.page - 1"
            :disabled="props.page === 1"
        >
            <i class="bi bi-chevron-left"></i>
        </button>
        <template v-for="(page, index) in pages" :key="page === '...' ? page + '-' + index : page">
            <button v-if="page === '...'"
                class="btn btn-link text-decoration-none"
                :disabled="true"
            >
                ...
            </button>
            <button v-if="page !== '...'"
                class="btn btn-link text-decoration-none"
                :class="page === props.page ? 'text-dark' : 'text-primary'"
                @click="emit('update:page', page)"
                :disabled="page === props.page"
            >
                {{ page }}
            </button>
        </template>
        <button
            class="btn btn-link text-decoration-none"
            @click="page = props.page + 1"
            :disabled="props.page >= props.pageLength"
        >
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

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
const page = ref(props.page);

const pages = computed(() => {
    const page = props.page;
    const pageLength = props.pageLength;
    const pages = [];

    if (pageLength <= 5) {
        for (let n=1; n<=pageLength; n++) {
            pages.push(n);
        }
    } else {
        if (pageLength <= 7) {
            for (let n=1; n<=pageLength; n++) {
                pages.push(n);
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

watch(() => props.page, (value) => {
    page.value = value;
});

watch(page, (value) => {
    emit('update:page', value);
});
</script>