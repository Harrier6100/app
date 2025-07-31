<template>
    <div class="container">
        <h6 class="mb-3">物性規格マスタ</h6>

        <form @submit.prevent="handleSubmit" autocomplete="off">

            <div class="row mb-3">
                <label class="col-3 col-form-label" for="productCode">品名コード</label>
                <div class="col-9">
                    <ProductCodeInput
                        id="productCode"
                        :readonly="isUpdateMode"
                        @change="productCodeSelect"
                        @error="err => errors.productCode = err"
                    />
                    <Message :error="errors.productCode" />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-3 col-form-label" for="productName">品名</label>
                <div class="col-9">
                    <input class="form-control" type="text" id="productName" v-model="physpropSpec.productName" readonly>
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-3 col-form-label" for="userCode"></label>
                <div class="col-9">
                    <UserCodeInput
                        id="userCode"
                        :readonly="isUpdateMode"
                        @change="userCodeSelect"
                        @error="err => errors.userCode = err"
                    />
                    <Message :error="errors.userCode" />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-3 col-form-label" for="userName"></label>
                <div class="col-9">
                    <input class="form-control" type="text" id="userName" v-model="physpropSpec.userName" readonly>
                </div>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Message from '@/components/Message.vue';
import ProductCodeInput from '@/components/ProductCodeInput.vue';
import UserCodeInput from '@/components/UserCodeInput.vue';

const route = useRoute();
const router = useRouter();
const errors = ref({});
const physpropSpec = ref({
    productCode: '',
    productName: '',
    userCode: '',
    userName: '',
});

const isUpdateMode = computed(() => {
    return !!route.params.code;
});

const productCodeSelect = (item) => {
    physpropSpec.value.productName = item?.productName ?? '';
};

const userCodeSelect = (item) => {
    physpropSpec.value.userName = item?.name ?? '';
};
</script>