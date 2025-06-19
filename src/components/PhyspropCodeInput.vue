<template>
    <div class="position-relative">
        <input class="form-control" type="text" v-bind="attrs" v-model="inputValue" @change="change">
        <a class="position-absolute top-50 end-0 translate-middle-y pe-3" role="button" @click="open">
            <i class="bi bi-search"></i>
        </a>
    </div>
    <PhyspropCodeSelector
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
import PhyspropCodeSelector from '@/components/PhyspropCodeSelector.vue';

const adherendMap = {
    KN: [
        { code: 'A', name: ' #ＳＵＳ３６０' },
        { code: 'B', name: ' #ＳＵＳ１２００' },
        { code: 'C', name: ' #ＨＡ５' },
        { code: 'D', name: ' #ＨＡ９' },
        { code: 'E', name: ' #フロート硝子３ｍｍ' },
        { code: 'F', name: ' #ポリイミド' },
        { code: 'G', name: ' #ソーダ硝子' },
        { code: 'H', name: ' #ＰＰ' },
        { code: 'I', name: ' #ＰＥ' },
        { code: 'J', name: ' #ＰＳ' },
        { code: 'K', name: ' #Ｓｉ' },
        { code: 'L', name: ' #ＡＢＳ' },
        { code: 'M', name: ' #アクリルオパール４３２' },
        { code: 'N', name: ' #メラミン塗装鉄板' },
        { code: 'O', name: ' #ボンデ鋼板' },
        { code: 'P', name: ' #ＳＵＳ１２００ＵＶ' },
        { code: 'Q', name: ' #ゴリラガラス２' },
        { code: 'R', name: ' #ポリイミド' },
        { code: 'S', name: ' #銅' },
    ],
    HO: [
        { code: '01', name: ' #ＳＵＳ' },
        { code: '02', name: ' #ＰＥＮ' },
        { code: '03', name: ' #ＦＰ５０１１' },
        { code: '04', name: ' # ガラス板' },
        { code: '05', name: ' #ベーク' },
        { code: '06', name: ' #ＰＥ' },
        { code: '07', name: ' #鏡面ＳＵＳ' },
        { code: '08', name: ' #ＰＳ' },
        { code: '09', name: ' #＃６００研磨ＳＵＳ' },
        { code: '10', name: ' #メラミン塗装板' },
        { code: '11', name: ' #ＰＥＴ' },
        { code: '12', name: ' #鏡面　ＳＵＳ' },
        { code: '13', name: ' #ＰＩ' },
        { code: '14', name: ' #Ｃｕ' },
        { code: '15', name: ' #ＡＬ／ＰＥＴ間' },
        { code: '16', name: ' #ＥＶＡ／ＰＥＴ間' },
        { code: '17', name: ' #ＰＰ' },
        { code: '18', name: ' #ＰＶＣ' },
        { code: '19', name: ' #ＰＶＣ・タキロンプレート' },
        { code: '20', name: ' #アクリル板' },
        { code: '21', name: ' #ソーダガラス' },
        { code: '22', name: ' #ＮＦ　ＰＥＴトウメイ２５（Ｎ）' },
        { code: '23', name: ' #ガラス' },
        { code: '24', name: ' #アクリルオパール' },
        { code: '25', name: ' #ＰＥＴトウメイ５０（Ｎ）' },
        { code: '26', name: ' #ＰＣ' },
        { code: '27', name: ' #ＳＵＳ東洋指定' },
    ],
};

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
    const { code } = selected;
    inputValue.value = code;
    emit('select', selected);
    emit('error', false);
    emit('errorMessage', '');
};

const change = async () => {
    emit('select', {});
    emit('error', false);
    emit('errorMessage', '');
    if (!inputValue.value) return;

    let adherendCode = '';
    let adherendName = '';
    const propertyCodes = inputValue.value.split('_');
    if (propertyCodes[0] === 'A' && propertyCodes[3]) {
        const adherend = adherendMap.KN.find(item => item.code === propertyCodes[3]);
        if (adherend) {
            adherendName = adherend.name;
        }
        propertyCodes[3] = '';
    }
    if (propertyCodes[0] !== 'A' && propertyCodes[4]) {
        const adherend = adherendMap.HO.find(item => item.code === propertyCodes[4]);
        if (adherend) {
            adherendName = adherend.name;
        }
        propertyCodes[4] = '';
    }
    const propertyCode = propertyCodes.join('_');
    if (!adherendName) {
        emit('update:modelValue', propertyCode);
    }

    try {
        startLoading();
        const response = await api.get(`/api/physprop/names/${propertyCode}`);
        emit('select', { ...response.data, adherendName });
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