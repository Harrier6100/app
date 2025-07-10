<template>
    <div class="container-fluid">

        <h6 class="mb-3">アカウント</h6>

        <div class="d-flex justify-content-between gap-3 mb-3">
            <input class="form-control w-25" v-model="keyword" placeholder="検索">
            <button v-if="permission.has('users:create')" class="btn btn-primary" @click="addUser">新規追加</button>
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <td :class="orderBy('code')" @click="sortBy('code')" role="button">アカウント</td>
                    <td :class="orderBy('name')" @click="sortBy('name')" role="button">名前</td>
                    <td :class="orderBy('role')" @click="sortBy('role')" role="button">ロール</td>
                    <td :class="orderBy('expiryDate')" @click="sortBy('expiryDate')" role="button">有効期限</td>
                    <td :class="orderBy('isActive')" @click="sortBy('isActive')" role="button">状態</td>
                    <td :class="orderBy('createdAt')" @click="sortBy('createdAt')" role="button">作成日時</td>
                    <td :class="orderBy('createdBy')" @click="sortBy('createdBy')" role="button">作成者</td>
                    <td :class="orderBy('updatedAt')" @click="sortBy('updatedAt')" role="button">更新日時</td>
                    <td :class="orderBy('updatedBy')" @click="sortBy('updatedBy')" role="button">更新者</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in paginatedData" :key="user.code">
                    <td>{{ user.code }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.role === 'admin' ? 'Admin' : user.role === 'user' ? 'User' : user.role === 'guest' ? 'Guest' : '' }}</td>
                    <td>{{ formatDate(user.expiryDate) }}</td>
                    <td>{{ user.isActive ? '有効' : '無効' }}</td>
                    <td>{{ formatAt(user.createdAt) }}</td>
                    <td>{{ user.createdBy }}</td>
                    <td>{{ formatAt(user.updatedAt) }}</td>
                    <td>{{ user.updatedBy }}</td>
                    <td>
                        <div class="d-flex justify-content-center gap-3">
                            <button v-if="permission.has('users:update')" class="btn btn-link text-decoration-none p-0" @click="updateUser(user)">編集</button>
                            <button v-if="permission.has('users:remove')" class="btn btn-link text-decoration-none p-0" @click="removeUser(user)">削除</button>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRouterState } from '@/composables/useRouterState';
import { useLoading } from '@/composables/useLoading';
import { useConfirm } from '@/composables/useConfirm';
import { useToast } from '@/composables/useToast';
import { usePermission } from '@/composables/usePermission';
import { useDataTable } from '@/composables/useDataTableWithQuery';
import { api } from '@/services/api';
import { formatDate, formatAt } from '@/utils/formatDateTime';
import Pagination from '@/components/Pagination.vue';

const route = useRoute();
const router = useRouter();
const routerState = useRouterState();
const { isLoading, startLoading, stopLoading } = useLoading();
const { confirm } = useConfirm();
const { addToast } = useToast();
const permission = usePermission();
const users = ref([]);
const { keyword, page, pageLength, paginatedData, sortBy, orderBy } = useDataTable(users);

const fetchUsers = async () => {
    try {
        startLoading();
        const response = await api.get(`/api/users`);
        users.value = response.data;
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const addUser = () => {
    routerState.routeQuery.value = { ...route.query };
    router.push({ name: 'UserAdd' });
};

const updateUser = ({ code }) => {
    routerState.routeQuery.value = { ...route.query };
    router.push({ name: 'UserEdit', params: { code } });
};

const removeUser = async ({ code }) => {
    const isConfirm = await confirm('削除しますか？');
    if (!isConfirm) return;

    try {
        startLoading();
        await api.delete(`/api/users/${code}`);
        await fetchUsers();
        addToast('削除しました。', 'success');
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};

onMounted(() => {
    fetchUsers();
});
</script>