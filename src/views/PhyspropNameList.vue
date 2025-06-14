<template>
    <div class="mb-3">物性マスタ</div>

    <div class="d-flex justify-content-between mb-3">
        <input class="form-control w-25" type="text" v-model="search" placeholder="検索">
        <button type="button" class="btn btn-primary" @click="addPhyspropName">新規作成</button>
    </div>

    <table class="table table-hover">
        <thead>
            <tr>
                <th :class="['fw-normal', orderBy('code')]" @click="sortBy('code')">物性コード</th>
                <th :class="['fw-normal', orderBy('name')]" @click="sortBy('name')">物性名</th>
                <th :class="['fw-normal', orderBy('createdAt')]" @click="sortBy('createdAt')">作成日時</th>
                <th :class="['fw-normal', orderBy('createdBy')]" @click="sortBy('createdBy')">作成者</th>
                <th :class="['fw-normal', orderBy('updatedAt')]" @click="sortBy('updatedAt')">更新日時</th>
                <th :class="['fw-normal', orderBy('updatedBy')]" @click="sortBy('updatedBy')">更新者</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="physpropName in paginatedData" :key="physpropName.code">
                <td class="text-start">{{ physpropName.code }}</td>
                <td class="text-start">{{ physpropName.name }}</td>
                <td class="text-start">{{ formatAt(physpropName.createdAt) }}</td>
                <td class="text-start">{{ physpropName.createdBy }}</td>
                <td class="text-start">{{ formatAt(physpropName.updatedAt) }}</td>
                <td class="text-start">{{ physpropName.updatedBy }}</td>
                <td class="text-start">
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-link text-decoration-none text-dark p-0" type="button" @click="updatePhyspropName(physpropName.code)">編集</button>
                        <button class="btn btn-link text-decoration-none text-dark p-0" type="button" @click="removePhyspropName(physpropName.code)">削除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <Pagination
        v-model:page="page"
        :pageLength="pageLength"
    />

    <Alert v-if="alerts.length"
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfirm } from '@/composables/useConfirm';
import { useLoading } from '@/composables/useLoading';
import { useAlert } from '@/composables/useAlert';
import { useFilter } from '@/composables/useFilterWithQuery';
import { useSort } from '@/composables/useSortWithQuery';
import { usePagination } from '@/composables/usePaginationWithQuery';
import { api } from '@/services/api';
import { formatDate, formatAt } from '@/utils/formatDateTime';
import Alert from '@/components/Alert.vue';
import Pagination from '@/components/Pagination.vue';

const route = useRoute();
const router = useRouter();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { alerts, addAlert, removeAlert } = useAlert();

const physpropNames = ref([]);
const { search, filteredData } = useFilter(physpropNames);
const { sortedData, sortBy, orderBy } = useSort(filteredData);
const { page, pageLength, paginatedData } = usePagination(sortedData, 10);

onMounted(() => {
    fetchPhyspropNames();
});

const fetchPhyspropNames = async () => {
    try {
        startLoading();
        const response = await api.get(`/api/physprop/names`);
        physpropNames.value = response.data;
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const addPhyspropName = () => {
    router.push({
        name: 'PhyspropNameAdd',
        state: {
            routeQuery: route.query,
        },
    });
};

const updatePhyspropName = (code) => {
    router.push({
        name: 'PhyspropNameEdit',
        params: { code },
        state: {
            routeQuery: route.query,
        },
    });
};

const removePhyspropName = async (code) => {
    const confirmed = await confirm('削除しますか？');
    if (!confirmed) return;

    try {
        startLoading();
        await api.delete(`/api/physprop/names/${code}`);
        addAlert('物資コードを削除しました。', 'success');
        await fetchPhyspropNames();
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>