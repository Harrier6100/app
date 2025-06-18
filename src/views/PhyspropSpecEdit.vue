<template>
    <div class="mb-3">物性規格</div>

    <form @submit.prevent="save" autocomplete="off">
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label class="form-label" for="productCode">品名コード</label>
                    <ProductCodeInput
                        id="productCode"
                        v-model="physpropSpec.productCode"
                        @select="productCodeSelect"
                        @error="errorMessage.productCode = $event"
                        @syncError="isSyncError = $event"
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
                        @error="errorMessage.receiverCode = $event"
                        @syncError="isSyncError = $event"
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
import { ref, reactive, onMounted } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useToast } from '@/composables/useToast';
import { useMessage } from '@/composables/useMessageNext';
import { useModal } from '@/composables/useModalNext';
import Toast from '@/components/Toast.vue';
import Message from '@/components/Message.vue';
import FormButtons from '@/components/FormButtons.vue';
import ProductCodeInput from '@/components/ProductCodeInput.vue';
import ReceiverCodeInput from '@/components/ReceiverCodeInput.vue';

const { isLoading, startLoading, stopLoading } = useLoading();
const { toasts, addToast, removeToast } = useToast();
const { errorMessage } = useMessage();
const isSyncError = ref(false);

const physpropSpecRestore = () => ({
    productCode: '',
    productName: '',
    receiverCode: '',
    receiverName: '',
});
const physpropSpec = reactive(physpropSpecRestore());

const productCodeSelect = (selected) => {
    physpropSpec.productCode = selected.productCode;
    physpropSpec.productName = selected.productName;
};

const receiverCodeSelect = (selected) => {
    physpropSpec.receiverCode = selected.receiverCode;
    physpropSpec.receiverName = selected.receiverName;
};

const validate = () => {
    let isValid = true;

    errorMessage.productCode = '';
    if (!physpropSpec.productCode) {
        errorMessage.productCode = '品名コードは必須です。';
        isValid = false;
    }

    errorMessage.productName = '';
    if (!physpropSpec.productName) {
        errorMessage.productName = '品名は必須です。';
        isValid = false;
    }

    if (isSyncError.value) {
        isValid = false;
    }

    return isValid;
};

const save = async () => {
    if (!validate()) return;

    try {
        startLoading();
        addToast('保存しました。', 'success');
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>