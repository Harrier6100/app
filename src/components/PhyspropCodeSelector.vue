<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="close">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" @click="close"></button>
                        </div>
                        <div class="modal-body">
                            <Alert v-if="alert.isShow"
                                :alert="alert"
                                @close="clearAlert"
                            />

                            <div class="row">
                                <div class="col-3">
                                    <input class="form-control" type="text" v-model="search" placeholder="検索">
                                </div>
                                <div class="col-9">
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="fw-normal" :class="orderBy('code')" @click="sortBy('code')">物性コード</th>
                                                <th class="fw-normal" :class="orderBy('name')" @click="sortBy('name')">物性名</th>
                                                <th class="fw-normal" :class="orderBy('uom')" @click="sortBy('uom')">単位</th>
                                                <th class="fw-normal" :class="orderBy('numberSize')" @click="sortBy('numberSize')">ｎ数</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in paginatedData" :key="item.code">
                                                <td class="text-start">{{ item.code }}</td>
                                                <td class="text-start">{{ item.name }}</td>
                                                <td class="text-start">{{ item.uom }}</td>
                                                <td class="text-end">{{ item.numberSize }}</td>
                                                <td class="text-start">
                                                    <div class="d-flex justify-content-center">
                                                        <button class="btn btn-link text-decoration-none p-0" @click="select(item)">選択</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <pagination
                                v-model:page="page"
                                :pageLength="pageLength"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading'
import { useAlert } from '@/composables/useAlertNext';
import { useFilter } from '@/composables/useFilter';
import { useSort } from '@/composables/useSort';
import { usePagination } from '@/composables/usePagination';
import Alert from '@/components/AlertNext.vue';
import Pagination from '@/components/Pagination.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['select', 'close']);
const { startLoading, stopLoading } = useLoading();
const { alert, setAlert, clearAlert } = useAlert();

const items = ref([]);
const { search, filteredData } = useFilter(items);
const { sortedData, sortBy, orderBy } = useSort(filteredData);
const { page, pageLength, paginatedData } = usePagination(sortedData, 10);

onMounted(async () => {
    try {
        startLoading();
        const response = await api.get(`/api/physprop/names`);
        items.value = response.data;
    } catch (error) {
        setAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
});

watch(search, () => {
    page.value = 1;
});

const select = (selected) => {
    emit('select', selected);
    emit('close');
};

const close = () => {
    emit('close');
};
</script>