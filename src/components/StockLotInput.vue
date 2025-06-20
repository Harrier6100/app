<template>
    <div class="position-relative">
        <input class="form-control" type="text" v-bind="attrs" v-model="inputValue" @change="change">
        <a class="position-absolute top-50 end-0 translate-middle-y pe-3" role="button" @click="isOpen = true">
            <div v-if="isAsyncLoading" class="spinner-border spinner-border-sm text-secondary"></div>
            <i v-else class="bi bi-search"></i>
        </a>
    </div>

    <StockLotSelector
        :isOpen="isOpen"
        @select="select"
        @close="isOpen = false"
    />
</template>

<script setup>
defineOptions({
    inheritAttrs: false,
});

import { useAttrs, ref, watch } from 'vue';
import { api } from '@/services/api';
import StockLotSelector from '@/components/StockLotSelector.vue';

const attrs = useAttrs();
const props = defineProps({
    modelValue: String,
});
const emit = defineEmits(['update:modelValue', 'change', 'loading', 'errorMessage', 'error']);
const inputValue = ref(props.modelValue);
const isAsyncLoading = ref(false);
const isOpen = ref(false);

const startAsyncLoading = () => {
    isAsyncLoading.value = true;
};

const stopAsyncLoading = () => {
    isAsyncLoading.value = false;
};

watch(() => props.modelValue, (value) => {
    inputValue.value = value;
});

watch(inputValue, (value) => {
    emit('update:modelValue', value);
});

const select = (selected) => {
    const { lot } = selected;
    inputValue.value = lot;
    emit('change', selected);
    emit('error', false);
    emit('errorMessage', '');
};

const change = async () => {
    emit('change', null);
    emit('errorMessage', '');
    emit('error', false);
    if (!inputValue.value) return;

    try {
        startAsyncLoading();
        emit('loading', true);
        const response = await api.get(`/api/stocks/${inputValue.value}`);
        emit('change', response.data);
        emit('errorMessage', '');
        emit('error', false);
    } catch (error) {
        emit('change', null);
        emit('errorMessage', error.message);
        emit('error', true);
    } finally {
        stopAsyncLoading();
        emit('loading', false);
    }
};
</script>