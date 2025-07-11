<template>
    <div class="position-relative">
        <input
            class="form-control pe-5"
            type="text"
            :value="modelValue"
            :readonly="readonly"
            @input="e => emit('update:modelValue', e.target.value)"
            @change="emit('change')"
        >
        <button
            v-if="!props.readonly"
            class="btn btn-link position-absolute top-50 end-0 translate-middle-y"
            type="button"
            @click="emit('open')"
        >
            <i class="bi bi-search"></i>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    readonly: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change', 'open']);
</script>