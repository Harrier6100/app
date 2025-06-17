<template>
    <div class="mb-3">物性規格マスタ</div>

    <div class="d-flex justify-content-between mb-3">
        <input class="form-control w-25" type="text" v-model="search" placeholder="検索">
        <button type="button" class="btn btn-primary" @click="addPhyspropSpec">新規作成</button>
    </div>

    <table class="table table-hover">
        <thead>
            <tr>
                <th :class="['fw-normal', orderBy('productCode')]" @click="sortBy('productCode')">品名コード</th>
                <th :class="['fw-normal', orderBy('productName')]" @click="sortBy('productName')">品名</th>
                <th :class="['fw-normal', orderBy('customerCode')]" @click="sortBy('customerCode')">得意先コード</th>
                <th :class="['fw-normal', orderBy('customerName')]" @click="sortBy('customerName')">得意先名</th>
                <th :class="['fw-normal', orderBy('createdAt')]" @click="sortBy('createdAt')">作成日時</th>
                <th :class="['fw-normal', orderBy('createdBy')]" @click="sortBy('createdBy')">作成者</th>
                <th :class="['fw-normal', orderBy('updatedAt')]" @click="sortBy('updatedAt')">更新日時</th>
                <th :class="['fw-normal', orderBy('updatedBy')]" @click="sortBy('updatedBy')">更新者</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(physpropSpec, index) in paginatedData" :key="index">
                <td class="text-start">{{ physpropSpec.productCode }}</td>
                <td class="text-start">{{ physpropSpec.productName }}</td>
                <td class="text-start">{{ physpropSpec.customerCode }}</td>
                <td class="text-start">{{ physpropSpec.customerName }}</td>
                <td class="text-start">{{ formatAt(physpropSpec.createdAt) }}</td>
                <td class="text-start">{{ physpropSpec.createdBy }}</td>
                <td class="text-start">{{ formatAt(physpropSpec.updatedAt) }}</td>
                <td class="text-start">{{ physpropSpec.updatedBy }}</td>
                <td class="text-start">
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-link text-decoration-none text-dark p-0" type="button" @click="updatePhyspropSpec(physpropSpec)">編集</button>
                        <button class="btn btn-link text-decoration-none text-dark p-0" type="button" @click="removePhyspropSpec(physpropSpec)">削除</button>
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

const physpropSpecs = ref([]);
const { search, filteredData } = useFilter(physpropSpecs);
const { sortedData, sortBy, orderBy } = useSort(filteredData);
const { page, pageLength, paginatedData } = usePagination(sortedData, 10);

onMounted(() => {
    fetchPhyspropSpecs();
});

const fetchPhyspropSpecs = async () => {
    try {
        startLoading();
        const response = await api.get(`/api/physprop/specs`);
        physpropSpecs.value = response.data;
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const addPhyspropSpec = () => {
    router.push({
        name: 'PhyspropSpecAdd',
        state: {
            routeQuery: route.query,
        },
    });
};

const updatePhyspropSpec = ({ productCode, customerCode }) => {
    router.push({
        name: 'PhyspropSpecEdit',
        params: { productCode, customerCode },
        state: {
            routeQuery: route.query,
        },
    });
};

const removePhyspropSpec = async (code) => {
    const confirmed = await confirm('削除しますか？');
    if (!confirmed) return;

    try {
        startLoading();
        await api.delete(`/api/physprop/specs/${code}`);
        addAlert('物資規格を削除しました。', 'success');
        await fetchPhyspropSpecs();
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>