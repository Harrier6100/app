<template>
    <div class="position-relative">
        <input class="form-control" type="text" v-bind="attrs" v-model="receiverCode" @change="change">
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
const emit = defineEmits(['update:modelValue', 'select', 'error', 'syncError']);
const { isLoading, startLoading, stopLoading } = useLoading();
const { isOpen, open, close } = useModal();
const receiverCode = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
    receiverCode.value = value;
});

watch(receiverCode, (value) => {
    emit('update:modelValue', value);
});

const select = (selected) => {
    emit('select', selected);
};

const change = async () => {
    emit('error', '');
    emit('syncError', false);
    if (!receiverCode.value) return;

    try {
        startLoading();
        const response = await api.get(`/api/receiver/names/${receiverCode.value}`);
        emit('select', response.data);
        emit('syncError', false);
    } catch (error) {
        emit('error', error.message);
        emit('syncError', true);
    } finally {
        stopLoading();
    }
};
</script>