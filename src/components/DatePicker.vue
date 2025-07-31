<template>
    <input ref="inputRef"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import flatpickr from 'flatpickr';
import { Japanese } from 'flatpickr/dist/l10n/ja';
import 'flatpickr/dist/flatpickr.min.css';

const props = defineProps({
    modelValue: String,
    format: {
        type: String,
        default: 'Y-m-d',
    },
});
const emit = defineEmits(['update:modelValue']);
const inputRef = ref(null);
let picker = null;

watch(() => props.modelValue, (value) => {
    if (picker && value) {
        picker.setDate(value, false);
    }
});

onMounted(() => {
    picker = flatpickr(inputRef.value, {
        dateFormat: props.format,
        allowInput: true,
        locale: Japanese,
        onChange: ([selectedDate]) => {
            emit('update:modelValue', selectedDate);
        },
    });
});

onBeforeUnmount(() => {
    if (picker) {
        picker.destroy();
        picker = null;
    }
});
</script>

<style>
.flatpickr-calendar {
    font-size: 1rem !important;
}

.flatpickr-calendar .flatpickr-innerContainer .flatpickr-weekdays .flatpickr-weekday:nth-child(7n + 1),
.flatpickr-calendar .flatpickr-innerContainer .flatpickr-days .flatpickr-day:not(.flatpickr-disabled):not(.prevMonthDay):not(.nextMonthDay):nth-child(7n + 1) {
    color: red;
}

.flatpickr-calendar .flatpickr-innerContainer .flatpickr-weekdays .flatpickr-weekday:nth-child(7),
.flatpickr-calendar .flatpickr-innerContainer .flatpickr-days .flatpickr-day:not(.flatpickr-disabled):not(.prevMonthDay):not(.nextMonthDay):nth-child(7n) {
    color: blue;
}
</style>