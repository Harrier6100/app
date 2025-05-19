<template>
    <div class="container-fluid">
        <div class="mb-3">
            <h6>アカウント</h6>
        </div>
        <div class="mb-3">
            <div class="mb-3 d-flex justify-content-between">
                <input class="form-control w-25" v-model="search" @input="onInputSearch" :disabled="isLoading" placeholder="検索">
                <button class="btn btn-primary" @click="addUser" :disabled="isLoading">新規作成</button>
            </div>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th :class="orderBy('id')" @click="sortBy('id')">id</th>
                        <th :class="orderBy('name')" @click="sortBy('name')">名前</th>
                        <th :class="orderBy('email')" @click="sortBy('email')">メールアドレス</th>
                        <th :class="orderBy('role')" @click="sortBy('role')">役割</th>
                        <th :class="orderBy('expiryDate')" @click="sortBy('expiryDate')">有効期限</th>
                        <th :class="orderBy('createdAt')" @click="sortBy('createdAt')">作成日時</th>
                        <th :class="orderBy('createdBy')" @click="sortBy('createdBy')">作成者</th>
                        <th :class="orderBy('updatedAt')" @click="sortBy('updatedAt')">更新日時</th>
                        <th :class="orderBy('updatedBy')" @click="sortBy('updatedBy')">更新者</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedData" :key="user.id">
                        <td class="text-start">{{ user.id }}</td>
                        <td class="text-start">{{ user.name }}</td>
                        <td class="text-start">{{ user.email }}</td>
                        <td class="text-start">{{ user.role }}</td>
                        <td class="text-start">{{ user.expiryDate }}</td>
                        <td class="text-start">{{ user.createdAt }}</td>
                        <td class="text-start">{{ user.createdBy }}</td>
                        <td class="text-start">{{ user.updatedAt }}</td>
                        <td class="text-start">{{ user.updatedBy }}</td>
                        <td class="d-flex justify-content-center gap-3">
                            <button type="button" class="btn btn-link p-0" @click="updateUser(user.id)">編集</button>
                            <button type="button" class="btn btn-link p-0" @click="removeUser(user.id)">削除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination v-if="totalPage > 0"
                v-bind="{ currentPage, totalPage }"
                @prevPage="prevPage"
                @nextPage="nextPage"
            />
        </div>
    </div>
    <Alert v-if="alerts.length"
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '@/composables/useLoading';
import { useAlert } from '@/composables/useAlert';
import { useFilter } from '@/composables/useFilter';
import { useSort } from '@/composables/useSort';
import { usePagination } from '@/composables/usePagination';
import api from '@/services/api';
import Alert from '@/components/Alert';
import Pagination from '@/components/Pagination';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { alerts, addAlert, removeAlert } = useAlert();

const users = ref([]);
const { search, filteredData } = useFilter(users);
const { sortedData, sortBy, orderBy } = useSort(filteredData);
const { currentPage, totalPage, paginatedData, prevPage, nextPage } = usePagination(sortedData, 1);

onMounted(() => {
    fetchUsers();
});

const onInputSearch = () => {
    currentPage.value = 1;
};

const fetchUsers = async () => {
    try {
        startLoading();
        const response = await api.get('/api/users');
        users.value = response.data;
    } catch (error) {
        console.log(error);
    } finally {
        stopLoading();
    }
};

const addUser = () => {
    router.push({
        name: 'UserAdd',
        state: {
            saveQuery: route.query,
        },
    });
};

const updateUser = (id) => {
    router.push({
        name: 'UserEdit',
        params: { id },
        state: {
            saveQuery: route.query,
        },
    });
};

const removeUser = async (id) => {
    if (!window.confirm('削除しますか？')) return;

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