<template>
    <div class="mb-3">物性規格</div>

    <form @submit.prevent="save" autocomplete="off">
        <div class="mb-3">
            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <label class="form-label" for="productCode">品名コード</label>
                        <ProductCodeInput
                            id="productCode"
                            v-model="physpropSpec.productCode"
                            @select="productCodeSelect"
                            @error="isError = $event"
                            @errorMessage="errorMessage.productCode = $event"
                        />
                        <Message :error="errorMessage.productCode" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="productName">品名</label>
                        <input class="form-control" type="text" id="productName" v-model="physpropSpec.productName" readonly>
                        <Message :error="errorMessage.productName" />
                    </div>
                </div>

                <div class="col">
                    <div class="mb-3">
                        <label class="form-label" for="receiverCode">得意先コード</label>
                        <ReceiverCodeInput
                            id="receiverCode"
                            v-model="physpropSpec.receiverCode"
                            @select="receiverCodeSelect"
                            @error="isError = $event"
                            @errorMessage="errorMessage.receiverCode = $event"
                        />
                        <Message :error="errorMessage.receiverCode" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="receiverName">得意先名</label>
                        <input class="form-control" type="text" id="receiverName" v-model="physpropSpec.receiverName" readonly>
                        <Message :error="errorMessage.receiverName" />
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="fw-normal align-middle">物性コード</th>
                    <th class="fw-normal align-middle">物性名</th>
                    <th class="fw-normal align-middle">規格値</th>
                    <th class="fw-normal align-middle">単位</th>
                    <th class="fw-normal align-middle">ｎ数</th>
                    <th class="fw-normal align-middle">桁数</th>
                    <th class="fw-normal align-middle">必須</th>
                    <th class="fw-normal align-middle">有効</th>
                    <th class="fw-normal align-middle">
                        <div class="d-flex justify-content-center">
                            <button type="button" @click="propertySpecs.add(propertySpec)">追加</button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(spec, index) in physpropSpec.specs" :key="index">
                    <td class="align-middle" style="width: 12%">
                        <PhyspropCodeInput
                            v-model="spec.propertyCode"
                            @select="propertyCodeSelect(index, $event)"
                            @error="isError = $event"
                            @errorMessage="spec.error = $event"
                        />
                        <Message :error="spec.error" />
                    </td>

                    <td class="align-middle" style="width: 20%">
                        <input class="form-control" type="text" v-model="spec.propertyName" readonly>
                    </td>

                    <td class="align-middle" style="width: 30%">
                        <div class="d-flex gap-1">
                            <input class="form-control" type="text" v-model="spec.values[0]">
                            <input class="form-control" type="text" v-model="spec.values[1]">
                            <input class="form-control" type="text" v-model="spec.values[2]">
                            <input class="form-control" type="text" v-model="spec.values[3]">
                            <input class="form-control" type="text" v-model="spec.values[4]">
                        </div>
                    </td>

                    <td class="align-middle" style="width: 8%">
                        <input class="form-control" type="text" v-model="spec.uom">
                    </td>

                    <td class="align-middle" style="width: 5%">
                        <input class="form-control" type="number" v-model="spec.numberSize">
                    </td>

                    <td class="align-middle" style="width: 6%">
                        <div class="d-flex align-items-center gap-1">
                            <input class="form-control" type="number" v-model="spec.decimalScale">
                            <input class="form-check-input" type="checkbox" v-model="spec.isTrancate">
                        </div>
                    </td>

                    <td class="align-middle" style="width: 3%">
                        <div class="d-flex justify-content-center">
                            <input class="form-check-input" type="checkbox" v-model="spec.isRequired">
                        </div>
                    </td>

                    <td class="align-middle" style="width: 3%">
                        <div class="d-flex justify-content-center">
                            <input class="form-check-input" type="checkbox" v-model="spec.isActive">
                        </div>
                    </td>

                    <td class="align-middle" style="width: 10%">
                        <div class="d-flex justify-content-center gap-1">
                            <button type="button" @click="propertySpecs.push(index, propertySpec)">挿</button>
                            <button type="button" @click="propertySpecs.up(index)">↑</button>
                            <button type="button" @click="propertySpecs.down(index)">↓</button>
                            <button type="button" @click="propertySpecs.remove(index)">削</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mb-3">
            <label class="form-label" for="remarks">備考</label>
            <textarea class="form-control" id="remarks" v-model="physpropSpec.remarks"></textarea>
        </div>

        <FormButtons
            :isLoading="isLoading"
            @cancel="cancel"
        />
    </form>

    <Toast
        :toasts="toasts"
        @close="removeToast"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading';
import { useToast } from '@/composables/useToast';
import { useMessage } from '@/composables/useMessageNext';
import { useModal } from '@/composables/useModalNext';
import { useArray } from '@/composables/useArray';
import Toast from '@/components/Toast.vue';
import Message from '@/components/Message.vue';
import FormButtons from '@/components/FormButtons.vue';
import ProductCodeInput from '@/components/ProductCodeInput.vue';
import ReceiverCodeInput from '@/components/ReceiverCodeInput.vue';
import PhyspropCodeInput from '@/components/PhyspropCodeInput.vue';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { toasts, addToast, removeToast } = useToast();
const { errorMessage } = useMessage();
const isError = ref(false);

const {
    productCode,
    receiverCode,
} = route.params;
const propertySpecs = useArray();
const propertySpec = {
    propertyCode: '',
    propertyName: '',
    values: new Array(5),
    uom: '',
    numberSize: 0,
    decimalScale: 0,
    isTrancate: false,
    isRequired: false,
    isActive: false,
    error: '',
};
const physpropSpecRestore = () => ({
    productCode: '',
    productName: '',
    receiverCode: '',
    receiverName: '',
    specs: propertySpecs.items,
    remarks: '',
});
const physpropSpec = ref(physpropSpecRestore());

onMounted(async () => {
    if (productCode || receiverCode) {
        try {
            startLoading();
            const response = await api.get(`/api/physprop/specs/${productCode}/${receiverCode ?? ''}`);
            physpropSpec.value.productCode = response.data.productCode;
            physpropSpec.value.productName = response.data.productName;
            physpropSpec.value.customerCode = response.data.customerCode;
            physpropSpec.value.customerName = response.data.customerName;
            physpropSpec.value.specs = response.data.specs;
            physpropSpec.value.remarks = response.data.remarks;
        } catch (error) {
            addToast(error.message, 'error');
        } finally {
            stopLoading();
        }
    }
});

const productCodeSelect = (selected) => {
    physpropSpec.value.productName = selected?.productName ?? '';
};

const receiverCodeSelect = (selected) => {
    physpropSpec.value.receiverName = selected?.receiverName ?? '';
};

const propertyCodeSelect = (index, selected) => {
    physpropSpec.value.specs[index].propertyName = selected?.name ?? '';
    physpropSpec.value.specs[index].propertyName += selected?.adherendName ?? '';
    physpropSpec.value.specs[index].uom = selected?.uom ?? '';
    physpropSpec.value.specs[index].numberSize = selected?.numberSize ?? 0;
};

const validate = () => {
    let isValid = true;

    errorMessage.productCode = '';
    if (!physpropSpec.value.productCode) {
        errorMessage.productCode = '品名コードは必須です。';
        isValid = false;
    }

    return isValid;
};

const save = async () => {
    if (isError.value || !validate()) {
        addToast('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        if (productCode || receiverCode) {
            await api.put(`/api/physprop/specs/${productCode}/${receiverCode ?? ''}`, physpropSpec.value);
        } else {
            await api.post(`/api/physprop/specs`, physpropSpec.value);
        }
        addToast('保存しました。', 'success');
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const cancel = () => {
    router.push({
        name: 'PhyspropSpecList',
        query: window.history.state?.routeQuery,
    });
};
</script>