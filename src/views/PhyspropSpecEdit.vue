<template>
    <div class="mb-3">物性規格</div>

    <form @submit.prevent="save" autocomplete="off">

        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label class="form-label" for="productCode">品名コード</label>
                    <div class="position-relative">
                        <input class="form-control pe-5" type="text" v-model="physpropSpec.productCode" @change="productCodeChange">
                        <a class="position-absolute top-50 end-0 translate-middle-y pe-3" role="button" @click="productCodeSelector.open">
                            <i class="bi bi-search"></i>
                        </a>
                    </div>
                    <Message :error="errorMessage.productCode" />
                </div>

                <div class="mb-3">
                    <label class="form-label" for="productName">品名</label>
                    <input class="form-control" type="text" v-model="physpropSpec.productName">
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label class="form-label" for="receiverCode">得意先コード</label>
                    <div class="position-relative">
                        <input class="form-control pe-5" type="text" v-model="physpropSpec.receiverCode" @change="receiverCodeChange">
                        <a class="position-absolute top-50 end-0 translate-middle-y pe-3" role="button" @click="receiverCodeSelector.open">
                            <i class="bi bi-search"></i>
                        </a>
                    </div>
                    <Message :error="errorMessage.receiverCode" />
                </div>

                <div class="mb-3">
                    <label class="form-label" for="receiverName">得意先名</label>
                    <input class="form-control" type="text" v-model="physpropSpec.receiverName">
                </div>
            </div>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>物性コード</th>
                    <th>物性名</th>
                    <th>規格値</th>
                    <th>単位</th>
                    <th>ｎ数</th>
                    <th>桁数</th>
                    <th>必須</th>
                    <th>有効</th>
                    <td>
                        <div class="d-flex justify-content-center gap-3">
                            <button type="button" @click="specs.add(spec)">追加</button>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(_, index) in physpropSpec.specs" :key="index">
                    <td class="align-middle" style="width: 12%">
                        <div class="position-relative">
                            <input class="form-control pe-5" type="text" v-model="physpropSpec.specs[index].propertyCode" @change="propertyCodeChange($event, index)">
                            <a class="position-absolute top-50 end-0 translate-middle-y pe-3" role="button" @click="propertyCodeSelectorOpenBefore(index)">
                                <i class="bi bi-search"></i>
                            </a>
                        </div>
                    </td>
                    <td class="align-middle" style="width: 20%">
                        <input class="form-control" type="text" v-model="physpropSpec.specs[index].propertyName">
                    </td>
                    <td class="align-middle" style="width: 35%">
                        <div class="d-flex gap-1">
                            <input class="form-control" type="text" v-model="physpropSpec.specs[index].values[0]">
                            <input class="form-control" type="text" v-model="physpropSpec.specs[index].values[1]">
                            <input class="form-control" type="text" v-model="physpropSpec.specs[index].values[2]">
                            <input class="form-control" type="text" v-model="physpropSpec.specs[index].values[3]">
                            <input class="form-control" type="text" v-model="physpropSpec.specs[index].values[4]">
                        </div>
                    </td>
                    <td class="align-middle" style="width: 7%">
                        <input class="form-control" type="text" v-model="physpropSpec.specs[index].uom">
                    </td>
                    <td class="align-middle" style="width: 5%">
                        <input class="form-control" type="number" v-model="physpropSpec.specs[index].numberSize">
                    </td>
                    <td class="align-middle" style="width: 5%">
                        <div class="d-flex align-items-center gap-1">
                            <input class="form-control" type="number" v-model="physpropSpec.specs[index].decimalScale">
                            <input class="form-check-input" type="checkbox" v-model="physpropSpec.specs[index].isTrancate">
                        </div>
                    </td>
                    <td class="align-middle"style="width: 3%">
                        <div class="d-flex justify-content-center">
                            <input class="form-check-input" type="checkbox" v-model="physpropSpec.specs[index].isRequired">
                        </div>
                    </td>
                    <td class="align-middle" style="width: 3%">
                        <div class="d-flex justify-content-center">
                            <input class="form-check-input" type="checkbox" v-model="physpropSpec.specs[index].isActive">
                        </div>
                    </td>
                    <td class="align-middle" style="width: 10%">
                        <div class="d-flex justify-content-center gap-1">
                            <button type="button" @click="specs.push(index, spec)">挿入</button>
                            <button type="button" @click="specs.up(index)">↑</button>
                            <button type="button" @click="specs.down(index)">↓</button>
                            <button type="button" @click="specs.remove(index)">削除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mb-3">
            <label class="form-label" for="remarks">備考</label>
            <textarea class="form-control" id="remarks" v-model="physpropSpec.remarks"></textarea>
        </div>

        <div class="d-flex justify-content-end gap-3">
            <button class="btn btn-secondary" type="button" @click="cancel">キャンセル</button>
            <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
        </div>

    </form>

    <ProductCodeSelector
        :isOpen="productCodeSelector.isOpen"
        @select="productCodeSet"
        @close="productCodeSelector.close"
    />

    <ReceiverCodeSelector
        :isOpen="receiverCodeSelector.isOpen"
        @select="receiverCodeSet"
        @close="receiverCodeSelector.close"
    />

    <PropertyCodeSelector
        :isOpen="propertyCodeSelector.isOpen"
        @select="propertyCodeSet"
        @close="propertyCodeSelector.close"
    />

    <Alert
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading';
import { useMessage } from '@/composables/useMessage';
import { useAlert } from '@/composables/useAlert';
import { useModal } from '@/composables/useModalNext';
import { useArray } from '@/composables/useArray';
import { adherendCodeKN, adherendCodeHO } from '@/constants/adherendCode';
import Message from '@/components/Message.vue';
import Alert from '@/components/Alert.vue';
import ProductCodeSelector from '@/components/ProductCodeSelector.vue';
import ReceiverCodeSelector from '@/components/ReceiverCodeSelector.vue';
import PropertyCodeSelector from '@/components/PropertyCodeSelector.vue';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { errorMessage } = useMessage();
const { alerts, addAlert, removeAlert } = useAlert();
const productCodeSelector = useModal();
const receiverCodeSelector = useModal();
const propertyCodeSelector = useModal();

const {
    productCode,
    receiverCode,
} = route.params;
const specs = useArray();
const spec = {
    propertyCode: '',
    propertyName: '',
    values: new Array(5),
    uom: '',
    numberSize: 0,
    decimalScale: 0,
    isRequired: false,
    isActive: true,
};
const physpropSpecRestore = () => ({
    productCode: '',
    productName: '',
    receiverCode: '',
    receiverName: '',
    specs: specs.items,
    remarks: '',
    isActive: true,
});
const physpropSpec = ref(physpropSpecRestore());

onMounted(() => {
    if (productCode || receiverCode) {
        fetchPhyspropSpec({ productCode, receiverCode });
    }
});

const fetchPhyspropSpec = async ({ productCode, receiverCode }) => {
    try {
        startLoading();
        const response = await api.get(`/api/physprop/specs/${productCode}/${receiverCode ?? ''}`);
        physpropSpec.value.productCode = response.data.productCode;
        physpropSpec.value.productName = response.data.productName;
        physpropSpec.value.specs = response.data.specs;
    } catch (err) {
        addAlert(err.message, 'error');
    } finally {
        stopLoading();
    }
};

const productCodeSet = ({ productCode, productName }) => {
    physpropSpec.value.productCode = productCode;
    physpropSpec.value.productName = productName;
};

const productCodeChange = async (event) => {
    errorMessage.value.productCode = '';
    const targetValue = event.target.value;
    if (!targetValue) return;

    try {
        startLoading();
        const response = await api.get(`/api/product/names/${targetValue}`);
        productCodeSet(response.data);
    } catch (err) {
        errorMessage.value.productCode = err.message;
    } finally {
        stopLoading();
    }
};

const receiverCodeSet = ({ receiverCode, receiverName }) => {
    physpropSpec.value.receiverCode = receiverCode;
    physpropSpec.value.receiverName = receiverName;
};

const receiverCodeChange = async (event) => {
    errorMessage.value.receiverCode = '';
    const targetValue = event.target.value;
    if (!targetValue) return;

    try {
        startLoading();
        const response = await api.get(`/api/receiver/names/${targetValue}`);
        receiverCodeSet(response.data);
    } catch (err) {
        errorMessage.value.receiverCode = err.message;
    } finally {
        stopLoading();
    }
};

const propertyCodeSelectorIndex = ref(null);
const propertyCodeSelectorOpenBefore = (index) => {
    propertyCodeSelectorIndex.value = index;
    propertyCodeSelector.open();
};

const propertyCodeSet = (propertyName, index = null) => {
    const targetIndex = index ?? propertyCodeSelectorIndex.value;
    physpropSpec.value.specs[targetIndex].propertyCode = propertyName.code;
    physpropSpec.value.specs[targetIndex].propertyName = propertyName.name;
    physpropSpec.value.specs[targetIndex].uom = propertyName.uom;
    physpropSpec.value.specs[targetIndex].numberSize = propertyName.numberSize;
};

const propertyCodeChange = async (event, index) => {
    errorMessage.value.propertyCode = '';
    const targetValue = event.target.value;
    if (!targetValue) return;

    let adherendCode = '';
    let adherendName = '';
    const propertyCodes = targetValue.split('_');
    if (propertyCodes[0] === 'A' && propertyCodes[3]) {
        adherendCode = propertyCodes[3];
        adherendName = adherendCodeKN.find(item => item.code === adherendCode);
        adherendName = adherendName.name ?? '';
        propertyCodes[3] = '';
    }
    if (propertyCodes[0] !== 'A' && propertyCodes[4]) {
        adherendCode = propertyCodes[4];
        adherendName = adherendCodeHO.find(item => item.code === adherendCode);
        adherendName = adherendName ? adherendName.name : '';
        propertyCodes[4] = '';
    }

    try {
        startLoading();
        const response = await api.get(`/api/physprop/names/${propertyCodes.join('_')}`);
        propertyCodeSet({
            ...response.data,
            code: propertyCodes.join('_') + adherendCode,
            name: response.data.name + adherendName,
        }, index);
    } catch (err) {
        errorMessage.value.propertyCode = err.message;
    } finally {
        stopLoading();
    }
};

const Validate = {
    run() {
        return ([
            this.productCode(),
            this.productName(),
            this.receiverCode(),
        ]).every(Boolean);
    },
    productCode() {
        if (!physpropSpec.value.productCode) {
            errorMessage.value.productCode = '品名コードを入力してください。';
        }
        return !errorMessage.value.productCode;
    },
    productName() {
        errorMessage.value.productName = '';
        if (!physpropSpec.value.productName) {
            errorMessage.value.productName = '品名を入力してください。';
        }
        return !errorMessage.value.productName;
    },
    receiverCode() {
        return !errorMessage.value.receiverCode;
    },
};

const save = async () => {
    if (!Validate.run()) {
        addAlert('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        if (productCode || receiverCode) {
            await api.put(`/api/physprop/specs/${productCode}/${receiverCode ?? ''}`, physpropSpec.value);
            addAlert('物性規格を更新しました。', 'success');
        } else {
            await api.post(`/api/physprop/specs`, physpropSpec.value);
            addAlert('物性規格を作成しました。', 'success');
        }
    } catch (err) {
        addAlert(err.message, 'error');
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