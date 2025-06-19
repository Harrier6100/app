<template>
    <div class="position-relative">
        <input class="form-control" type="text" v-bind="attrs" v-model="inputValue" @change="change">
        <a class="position-absolute top-50 end-0 translate-middle-y pe-3" role="button" @click="open">
            <i class="bi bi-search"></i>
        </a>
    </div>
    <ReceiverCodeSelector
        :isOpen="isOpen"
        @select="select"
        @close="close"
    />
</template>

<script setup>
defineOptions({
    inheritAttrs: false,
});

import { useAttrs, ref, watch } from 'vue';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading';
import { useModal } from '@/composables/useModal';
import ReceiverCodeSelector from '@/components/ReceiverCodeSelector.vue';

const attrs = useAttrs();
const props = defineProps({
    modelValue: String,
});
const emit = defineEmits(['update:modelValue', 'select', 'error', 'errorMessage']);
const { isLoading, startLoading, stopLoading } = useLoading();
const { isOpen, open, close } = useModal();
const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
    inputValue.value = value;
});

watch(inputValue, (value) => {
    emit('update:modelValue', value);
});

const select = (selected) => {
    const { receiverCode } = selected;
    inputValue.value = receiverCode;
    emit('select', selected);
    emit('error', false);
    emit('errorMessage', '');
};

const change = async () => {
    emit('select', {});
    emit('error', false);
    emit('errorMessage', '');
    if (!inputValue.value) return;

    try {
        startLoading();
        const response = await api.get(`/api/receiver/names/${inputValue.value}`);
        emit('select', response.data);
        emit('error', false);
        emit('errorMessage', '');
    } catch (error) {
        emit('select', {});
        emit('error', true);
        emit('errorMessage', error.message);
    } finally {
        stopLoading();
    }
};
</script>