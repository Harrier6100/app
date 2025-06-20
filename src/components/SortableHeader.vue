<template>
    <th
        class="fw-normal"
        :class="orderByClass"
        @click="click"
    >
        <slot />
    </th>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    column: String,
    orderBy: Function,
    sortBy: Function,
});

const orderByClass = computed(() => {
    return props.orderBy?.(props.column);
});

const click = () => {
    props.sortBy?.(props.column);
};
</script>