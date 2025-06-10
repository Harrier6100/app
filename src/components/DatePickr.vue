<template>
    <input ref="fpRef" :value="modelValue">
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
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

const fpRef = ref(null);
let fpInstance = null;

onMounted(() => {
    fpInstance = flatpickr(fpRef.value, {
        dateFormat: props.format,
        allowInput: true,
        locale: Japanese,
        onChange: (selectedDate, formattedStr) => {
            emit('update:modelValue', formattedStr);
        },
    });
});

watch(() => props.modelValue, (newValue) => {
    if (fpInstance) {
        fpInstance.setDate(newValue, false);
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