<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal show d-block" @click.self="close">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="d-flex justify-content-end mb-3">
                                <button class="btn-close" type="button" @click="close"></button>
                            </div>

                            <div class="row">
                                <div class="col-3">
                                    <form @submit.prevent="search" autocomplete="off">
                                        <div class="mb-3">
                                            <label class="form-label" for="productCode">品名コード</label>
                                            <input class="form-control" type="text" id="productCode" v-model="form.productCode">
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="productName">品名</label>
                                            <input class="form-control" type="text" id="productName" v-model="form.productName">
                                        </div>

                                        <div class="d-grid">
                                            <button class="btn btn-primary" :disabled="isLoading">
                                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>検索
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-9">
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th :class="['fw-normal', orderBy('productCode')]" @click="sortBy('productCode')">品名コード</th>
                                                <th :class="['fw-normal', orderBy('productName')]" @click="sortBy('productName')">品名</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in paginatedData" :key="index">
                                                <td class="text-start">{{ item.productCode }}</td>
                                                <td class="text-start">{{ item.productName }}</td>
                                                <td class="text-start">
                                                    <div class="d-flex justify-content-center">
                                                        <button class="btn btn-link text-decoration-none text-dark p-0" @click="select(item)">選択</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <pagination
                                        v-model:page="page"
                                        :pageLength="pageLength"
                                    />
                                </div>
                            </div>

                            <Message :error="message.error" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading'
import { useMessage } from '@/composables/useMessage';
import { useSort } from '@/composables/useSort';
import { usePagination } from '@/composables/usePagination';
import Message from '@/components/Message.vue';
import Pagination from '@/components/Pagination.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['select', 'close']);
const { isLoading, startLoading, stopLoading } = useLoading();
const { message } = useMessage();

const items = ref([]);
const { sortedData, sortBy, orderBy } = useSort(items);
const { page, pageLength, paginatedData } = usePagination(sortedData, 10);

const formRestore = () => ({
    productCode: '',
    productName: '',
});
const form = ref(formRestore());

const search = async () => {
    message.value.error = '';
    if (!form.value.productCode && !form.value.productName) {
        message.value.error = '検索条件を指定してください。';
        return;
    }

    try {
        startLoading();
        const response = await api.get(`/api/product/names/search`, { params: form.value });
        items.value = response.data;
    } catch (err) {
        message.value.error = err.message;
    } finally {
        stopLoading();
    }
};

const select = (item) => {
    emit('select', item);
    emit('close');
};

const close = () => {
    emit('close');
};
</script>