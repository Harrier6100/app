<template>
    <div class="mb-3">物性値</div>

    <form @submit.prevent="save" autocomplete="off">

        <div class="mb-3">
            <div class="row">
                <div class="col">

                    <div class="mb-3">
                        <label class="form-label" for="productLot">ロット</label>
                        <StockLotInput
                            v-model="physpropValue.productLot"
                            @change="productLotChange"
                            @loading="isAsyncLoading = $event"
                            @errorMessage="errorMessage.productLot = $event"
                            @error="isError = $event"
                        />
                        {{ errorMessage.productLot }}
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="productCode">品名コード</label>
                        <input class="form-control" type="text" id="productCode" v-model="physpropValue.productCode">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="productName">品名</label>
                        <input class="form-control" type="text" id="productName" v-model="physpropValue.productName">
                    </div>

                </div>
                <div class="col">
                </div>
            </div>
        </div>

        <div class="mb-3">
            <div class="row">
                <div class="col-9">

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th rowspan="2">#</th>
                                <th rowspan="2">物性コード</th>
                                <th rowspan="2">物性名</th>
                                <th rowspan="2">測定日</th>
                                <th rowspan="2">測定者</th>
                                <th rowspan="2">測定者名</th>
                                <th colspan="2">規格値</th>
                                <th rowspan="2">単位</th>
                                <th rowspan="2">ｎ数</th>
                                <th rowspan="2">平均値</th>
                                <th rowspan="2">判定</th>
                            </tr>
                            <tr>
                                <th>下限</th>
                                <th>上限</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="propertyItem in physpropValue.propertyItems" :key="propertyItem.propertyCode">
                                <td class="text-start">{{ propertyItem.propertyCode }}</td>
                                <td class="text-start">{{ propertyItem.propertyName }}</td>
                                <td class="text-start">{{ propertyItem.measuredDate }}</td>
                                <td class="text-start">{{ propertyItem.measurerCode }}</td>
                                <td class="text-start">{{ propertyItem.measurerName }}</td>
                                <td class="text-start">{{ propertyItem.uom }}</td>
                                <td class="text-start">{{ propertyItem.specLowerValue }}</td>
                                <td class="text-start">{{ propertyItem.specUpperValue }}</td>
                                <td class="text-end">{{ propertyItem.numberSize }}</td>
                                <td class="text-end">{{ propertyItem.meanValue }}</td>
                                <td class="text-start">{{ propertyItem.score }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="col-3">
                </div>
            </div>
        </div>

        <FormButtons
            :isLoading="isLoading"
            :isAsyncLoading="isAsyncLoading"
        />

    </form>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '@/services/api';
import { useArray } from '@/composables/useArray';
import StockLotInput from '@/components/StockLotInput.vue';
import FormButtons from '@/components/FormButtons.vue';

const errorMessage = ref({});
const isError = ref(false);
const isLoading = ref(false);
const isAsyncLoading = ref(false);

const propertyItems = useArray();
// const propertyItem = {
//     propertyCode: '',
//     propertyName: '',
//     propertyValues: Array.from(Array(1), (_, index) => ({
//         index,
//         value: null,
//         score: null,
//     })),
// };
const physpropValueRestore = () => ({
    productLot: '',
    productCode: '',
    productName: '',
    receiverCode: '',
    receiverName: '',
    propertyItems: propertyItems.items,
});
const physpropValue = ref(physpropValueRestore());

const productLotChange = (selected) => {
    physpropValue.value.productCode = selected?.code ?? '';
    physpropValue.value.productName = selected?.name ?? '';

    if (selected?.lot) {
        propertySpecGet();
    }
};

const propertySpecGet = async () => {
    const productCode = physpropValue.value.productCode.slice(0, 9);
    const receiverCode = physpropValue.value.receiverCode;

    try {
        const response = await api.get(`/api/physprop/specs/${productCode}/${receiverCode ?? ''}`);
        propertySpecSet(response.data);
    } catch (err) {
    } finally {
    }
};

const propertySpecSet = (propertySpec) => {
    for (const spec of propertySpec.specs) {
        const _propertyItem_ = {
            propertyCode: spec.propertyCode,
            propertyName: spec.propertyName,
            measuredDate: null,
            measurerCode: '',
            measurerName: '',
            specUpperValue: null,
            specLowerValue: null,
            uom: spec.uom,
            numberSize: spec.numberSize,
            isTrancate: spec.isTrancate,
            propertyValues: Array.from(Array(spec.numberSize), (_, index) => ({
                index,
                value: null,
                score: null,
            })),
            meanValue: null,
            score: null,
        };
        propertyItems.add(_propertyItem_);
    }
};

const save = async () => {
    isLoading.value = true;
};
</script>