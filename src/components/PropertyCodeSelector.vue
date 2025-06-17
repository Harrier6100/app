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

                            <div class="d-flex justify-content-between mb-3">
                                <input class="form-control w-25" type="text" v-model="search" placeholder="検索">
                            </div>

                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th :class="['fw-normal', orderBy('code')]" @click="sortBy('code')">物性コード</th>
                                        <th :class="['fw-normal', orderBy('name')]" @click="sortBy('name')">物性名</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedData" :key="index">
                                        <td class="text-start">{{ item.code }}</td>
                                        <td class="text-start">{{ item.name }}</td>
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
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading'
import { useFilter } from '@/composables/useFilter';
import { useSort } from '@/composables/useSort';
import { usePagination } from '@/composables/usePagination';
import Pagination from '@/components/Pagination.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['select', 'close']);
const { startLoading, stopLoading } = useLoading();

const items = ref([]);
const { search, filteredData } = useFilter(items);
const { sortedData, sortBy, orderBy } = useSort(filteredData);
const { page, pageLength, paginatedData } = usePagination(sortedData, 10);

onMounted(() => {
    fetchPhyspropNames();
});

watch(search, () => {
    page.value = 1;
});

const fetchPhyspropNames = async () => {
    try {
        startLoading();
        const response = await api.get(`/api/physprop/names`);
        items.value = response.data;
    } catch (err) {
        console.error(err);
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