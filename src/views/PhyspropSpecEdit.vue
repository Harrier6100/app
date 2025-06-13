<template>
    <div class="mb-3">物性規格</div>

    <form @submit.prevent="save" autocomplete="off">

        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label class="form-label" for="productCode">品名コード</label>
                    <div class="position-relative">
                        <input class="form-control pe-5" type="text">
                        <a href="#" class="position-absolute top-50 end-0 translate-middle-y pe-3" @click="test">
                            <i class="bi bi-search"></i>
                        </a>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label" for="productName">品名</label>
                    <input class="form-control pe-5" type="text">
                </div>
            </div>

            <div class="col">
                <div class="mb-3">
                    <label class="form-label" for="customerCode">得意先コード</label>
                    <div class="position-relative">
                        <input class="form-control pe-5" type="text">
                        <a href="#" class="position-absolute top-50 end-0 translate-middle-y pe-3" @click="test">
                            <i class="bi bi-search"></i>
                        </a>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label" for="customerName">得意先名</label>
                    <input class="form-control pe-5" type="text">
                </div>
            </div>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>物性コード</th>
                    <th>物性名</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(spec, index) in physpropSpec.specs" :key="index">
                    <td>
                        <input class="form-control" v-model="spec.propertyCode">
                    </td>
                </tr>
            </tbody>
        </table>

    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArray } from '@/composables/useArray';

const route = useRoute();
const router = useRouter();

const {
    productCode,
    customerCode,
} = ref(route.params);
const spec = ref({
    propertyCode: '',
    propertyName: '',
    values: new Array(5),
    uom: '',
    numberSize: 0,
    decimalScale: 0,
    isRequired: false,
    isActive: true,
});
const specs = useArray([spec.value]);
const physpropSpecRestore = () => ({
    productCode: '',
    productName: '',
    customerCode: '',
    customerName: '',
    specs: specs.items,
    remarks: '',
    isActive: true,
});
const physpropSpec = ref(physpropSpecRestore());

onMounted(() => {
    if (productCode || customerCode) {
        fetchPhyspropSpec({ productCode, customerCode })
    }
});

const fetchPhyspropSpec = async ({ productCode, customerCode }) => {
    try {
    } catch (error) {
    } finally {
    }
};
</script>