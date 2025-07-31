<template>
    <SearchInput
        v-model="inputValue"
        :readonly="readonly"
        @open="productCodeSelector.open"
        @change="handleChange"
    />

    <ProductCodeSelector
        :isOpen="productCodeSelector.isOpen.value"
        @select="handleSelect"
        @close="productCodeSelector.close"
    />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useDisclosure } from '@/composables/useDisclosure';
import { api } from '@/libs/api';
import SearchInput from '@/components/SearchInput.vue';
import ProductCodeSelector from '@/components/ProductCodeSelector.vue';

const props = defineProps({
    modelValue: String,
    readonly: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change', 'error']);

const { isLoading, startLoading, stopLoading } = useLoading();
const productCodeSelector = useDisclosure();
const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
    inputValue.value = value;
});

watch(inputValue, (value) => {
    emit('update:modelValue', value);
});

const handleSelect = (item) => {
    inputValue.value = item?.productCode ?? '';
    emit('change', item);
    emit('error', null);
};

const handleChange = async (item) => {
    emit('change', null);
    emit('error', null);
    if (!inputValue.value) return;

    try {
        startLoading();
        const response = await api.get(`/api/products/${inputValue.value}`);
        emit('change', response.data);
        emit('error', null);
    } catch (error) {
        emit('change', null);
        emit('error', error.message);
    } finally {
        stopLoading();
    }
};
</script>