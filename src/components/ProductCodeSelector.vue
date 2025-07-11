<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="emit('close')">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <Message :error="errorMessage.error" />
                            <button class="btn-close" @click="emit('close')"></button>
                        </div>
                        <div class="modal-body">


                            <div class="row">
                                <div class="col-3">
                                    <form @submit.prevent="search" autocomplete="off">
                                        <div class="mb-3">
                                            <input class="form-control" type="text" v-model="form.productCode" placeholder="品名コード">
                                        </div>
                                        <div class="mb-3">
                                            <input class="form-control" type="text" v-model="form.productName" placeholder="品名">
                                        </div>
                                        <AsyncButton :wrap="true" :isAsync="isAsync">検索</AsyncButton>
                                    </form>
                                </div>
                                <div class="col-9">
                                    <table class="table table-bordered table-hover">
                                        <thead class="table-secondary">
                                            <tr>
                                                <td>品名コード</td>
                                                <td>品名</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in paginatedData" :key="item.productCode">
                                                <td>{{ item.productCode }}</td>
                                                <td>{{ item.productName }}</td>
                                                <td>
                                                    <div class="d-flex justify-content-center">
                                                        <button class="btn btn-link text-decoration-none p-0" @click="select(item)">選択</button>
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
import { ref } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useAsync } from '@/composables/useAsync';
import { useMessage } from '@/composables/useMessage';
import { useDataTable } from '@/composables/useDataTable';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';
import Pagination from '@/components/Pagination.vue';
import AsyncButton from '@/components/AsyncButton.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);
const { startLoading, stopLoading } = useLoading();
const { isAsync, execute } = useAsync();
const { errorMessage } = useMessage();

const items = ref([]);
const { page, pageLength, paginatedData, sortBy, orderBy } = useDataTable(items);

const formRestore = () => ({
    productCode: '',
    productName: '',
});
const form = ref(formRestore());

const search = async () => {
    errorMessage.value.error = '';
    if (!form.value.productCode && !form.value.productName) {
        errorMessage.value.error = '検索条件を指定してください。';
        return;
    }

    try {
        startLoading();
        await execute(async () => {
            const response = await api.get(`/api/products/search`, { params: form.value });
            items.value = response.data;
        });
    } catch (error) {
        errorMessage.value.error = error.message;
    } finally {
        stopLoading();
    }
};

const select = (selected) => {
    emit('select', selected);
    emit('close');
};
</script>