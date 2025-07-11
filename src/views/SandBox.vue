<template>
    <div class="container">

        <h6 class="mb-3">SundBox</h6>

        <ProductCodeInput
            v-model="form.productCode"
            :readonly="!!productCode"
            @change="productCodeChange"
            @error="val => isError.productCode = val"
        />

        <p>ProductName: {{ productName }}</p>
        {{ isError }}

    </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCodeInput from '@/components/ProductCodeInput.vue';

const form = ref({
    productCode: '',
});
const productCode = '';
const productName = ref('');
const productCodeChange = (item) => {
    productName.value = item.productName;
};
const isError = ref({
    productCode: false,
});
</script>