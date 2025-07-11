<template>
    <SearchInput
        v-model="inputValue"
        :readonly="readonly"
        @open="selector.open"
        @change="change"
    />
    <Message :error="errorMessage.error" />

    <ProductCodeSelector
        :isOpen="selector.isOpen.value"
        @select="select"
        @close="selector.close"
    />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useMessage } from '@/composables/useMessage';
import { useToggle } from '@/composables/useToggle';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';
import SearchInput from '@/components/SearchInput.vue';
import ProductCodeSelector from '@/components/ProductCodeSelector.vue';

const props = defineProps({
    modelValue: String,
    readonly: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change', 'error']);
const { isLoading, startLoading, stopLoading } = useLoading();
const { errorMessage } = useMessage();
const selector = useToggle();
const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    inputValue.value = val;
});

watch(inputValue, (val) => {
    emit('update:modelValue', val);
});

const select = (selected) => {
    inputValue.value = selected.productCode;
    emit('change', selected);
    emit('error', false);
};

const change = async () => {
    errorMessage.value.error = '';
    emit('change', {});
    emit('error', false);
    if (!inputValue.value) return;

    try {
        startLoading();
        const response = await api.get(`/api/products/${inputValue.value}`);
        emit('change', response.data);
        emit('error', false);
    } catch (error) {
        errorMessage.value.error = error.message;
        emit('change', {});
        emit('error', true);
    } finally {
        stopLoading();
    }
};
</script>