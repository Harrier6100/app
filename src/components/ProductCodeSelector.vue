<template>
    <teleport to="body">
        <div v-if="isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" type="button" @click="emit('close')"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-3">
                                    <form @submit.prevent="handleSubmit" autocomplate="off">
                                        <div class="mb-3">
                                            <input class="form-control" type="text" v-model="form.productCode" placeholder="品名コード">
                                        </div>
                                        <div class="mb-3">
                                            <input class="form-control" type="text" v-model="form.productName" placeholder="品名">
                                        </div>
                                        <div class="d-grid">
                                            <button class="btn btn-primary" type="submit" :disabled="isLoading">
                                                <span v-if="isSpinning" class="spinner-border spinner-border-sm me-1"></span>検索
                                            </button>
                                        </div>
                                        <Message :error="errors.error" />
                                    </form>
                                </div>
                                <div class="col-9">
                                    <table class="table table-bordered table-hover">
                                        <thead class="table-secondary">
                                            <tr>
                                                <td :class="orderBy('productCode')" @click="sortBy('productCode')">品名コード</td>
                                                <td :class="orderBy('productName')" @click="sortBy('productName')">品名</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in paginatedData" :key="item.productCode">
                                                <td class="text-start">{{ item.productCode }}</td>
                                                <td class="text-start">{{ item.productName }}</td>
                                                <td class="text-start">
                                                    <div class="d-flex justify-content-center">
                                                        <button class="btn btn-link text-decoration-none p-0" type="button" @click="handleSelect(item)">選択</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <Pagination
                                        v-model:page="page"
                                        :pageLength="pageLength"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useAsync } from '@/composables/useAsync';
import { useDataTable } from '@/composables/useDataTable';
import { api } from '@/libs/api';
import Message from '@/components/Message.vue';
import Pagination from '@/components/Pagination.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['select', 'close']);

const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useAsync();
const items = ref([]);
const { page, pageLength, paginatedData, sortBy, orderBy } = useDataTable(items, 10);
const errors = ref([]);
const form = ref({
    productCode: '',
    productName: '',
});

watch(items, () => {
    page.value = 1;
});

const handleSubmit = async () => {
    errors.value.error = '';
    if (!form.value.productCode && !form.value.productName) {
        errors.value.error = '検索条件を指定してください。';
        return;
    }

    try {
        startLoading();
        await execute(async () => {
            const response = await api.get(`/api/products/search`, { params: form.value });
            items.value = response.data;
        });
    } catch (error) {
        errors.value.error = error.message;
    } finally {
        stopLoading();
    }
};

const handleSelect = (item) => {
    emit('select', item);
    emit('close');
};
</script>