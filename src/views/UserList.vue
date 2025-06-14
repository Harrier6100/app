<template>
    <div class="mb-3">アカウント</div>

    <div class="d-flex justify-content-between mb-3">
        <input class="form-control w-25" type="text" v-model="search" placeholder="検索">
        <button class="btn btn-primary" type="button" @click="addUser">新規作成</button>
    </div>

    <table class="table table-hover">
        <thead>
            <tr>
                <th :class="['fw-normal', orderBy('id')]" @click="sortBy('id')">アカウント</th>
                <th :class="['fw-normal', orderBy('name')]" @click="sortBy('name')">名前</th>
                <th :class="['fw-normal', orderBy('email')]" @click="sortBy('email')">メールアドレス</th>
                <th :class="['fw-normal', orderBy('role')]" @click="sortBy('role')">役割</th>
                <th :class="['fw-normal', orderBy('expiryDate')]" @click="sortBy('expiryDate')">有効期限</th>
                <th :class="['fw-normal', orderBy('isActive')]" @click="sortBy('isActive')">状態</th>
                <th :class="['fw-normal', orderBy('createdAt')]" @click="sortBy('createdAt')">作成日時</th>
                <th :class="['fw-normal', orderBy('createdBy')]" @click="sortBy('createdBy')">作成者</th>
                <th :class="['fw-normal', orderBy('updatedAt')]" @click="sortBy('updatedAt')">更新日時</th>
                <th :class="['fw-normal', orderBy('updatedBy')]" @click="sortBy('updatedBy')">更新者</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in paginatedData" :key="user.id">
                <td class="text-start">{{ user.id }}</td>
                <td class="text-start">{{ user.name }}</td>
                <td class="text-start">{{ user.email }}</td>
                <td class="text-start">{{ user.role }}</td>
                <td class="text-start">{{ formatDate(user.expiryDate) }}</td>
                <td class="text-start">{{ user.isActive ? '有効' : '無効' }}</td>
                <td class="text-start">{{ formatAt(user.createdAt) }}</td>
                <td class="text-start">{{ user.createdBy }}</td>
                <td class="text-start">{{ formatAt(user.updatedAt) }}</td>
                <td class="text-start">{{ user.updatedBy }}</td>
                <td class="text-start">
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-link text-decoration-none text-dark p-0" type="button" @click="updateUser(user.id)">編集</button>
                        <button class="btn btn-link text-decoration-none text-dark p-0" type="button" @click="removeUser(user.id)">削除</button>
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

const users = ref([]);
const { search, filteredData } = useFilter(users);
const { sortedData, sortBy, orderBy } = useSort(filteredData);
const { page, pageLength, paginatedData } = usePagination(sortedData, 10);

onMounted(() => {
    fetchUsers();
});

const fetchUsers = async () => {
    try {
        startLoading();
        const response = await api.get(`/api/users`);
        users.value = response.data;
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const addUser = () => {
    router.push({
        name: 'UserAdd',
        state: {
            routeQuery: route.query,
        },
    });
};

const updateUser = (id) => {
    router.push({
        name: 'UserEdit',
        params: { id },
        state: {
            routeQuery: route.query,
        },
    });
};

const removeUser = async (id) => {
    const confirmed = await confirm('削除しますか？');
    if (!confirmed) return;

    try {
        startLoading();
        await api.delete(`/api/users/${id}`);
        addAlert('アカウントを削除しました。', 'success');
        await fetchUsers();
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>