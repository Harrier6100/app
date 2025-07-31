<template>
    <div class="container-fluid">
        <h6 class="mb-3">アカウント</h6>

        <div class="d-flex justify-content-between gap-3 mb-3">
            <input class="form-control w-25" v-model="keyword" placeholder="検索">
            <button class="btn btn-primary" type="button" @click="handleCreateUser">新規作成</button>
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
                    <td>{{ roleLabel(user.role) }}</td>
                    <td>{{ formatDate(user.expiryDate) }}</td>
                    <td>{{ user.isActive ? '有効' : '無効' }}</td>
                    <td>{{ formatAt(user.createdAt) }}</td>
                    <td>{{ user.createdBy }}</td>
                    <td>{{ formatAt(user.updatedAt) }}</td>
                    <td>{{ user.updatedBy }}</td>
                    <td>
                        <div class="d-flex justify-content-center gap-3">
                            <button v-if="hasPermission('users:update')" class="btn btn-link text-decoration-none p-0" type="button" @click="handleUpdateUser(user)">編集</button>
                            <button v-if="hasPermission('users:remove')" class="btn btn-link text-decoration-none p-0" type="button" @click="handleRemoveUser(user)">削除</button>
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
import { useUser } from '@/composables/useUser';
import { useLoading } from '@/composables/useLoading';
import { useConfirm } from '@/composables/useConfirm';
import { useToast } from '@/composables/useToast';
import { useDataTable } from '@/composables/useDataTableQuery';
import { fetchUsers, removeUser } from '@/services/user';
import { formatDate, formatAt } from '@/utils/formatDateTime';
import Pagination from '@/components/Pagination.vue';

const route = useRoute();
const router = useRouter();
const routerState = useRouterState();
const { hasPermission } = useUser();
const { isLoading, startLoading, stopLoading } = useLoading();
const { confirm } = useConfirm();
const { addToast } = useToast();
const users = ref([]);
const { keyword, page, pageLength, paginatedData, sortBy, orderBy } = useDataTable(users, 10);
const roleMap = {
    admin: 'Admin',
    user: 'User',
    guest: 'Guest',
};

const roleLabel = (role) => {
    return roleMap[role] ?? '';
};

const getUsers = async () => {
    try {
        startLoading();
        const response = await fetchUsers();
        users.value = response.data;
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const handleCreateUser = () => {
    routerState.setState({ ...route.query });
    router.push({
        name: 'UserCreate',
    });
};

const handleUpdateUser = ({ code }) => {
    routerState.setState({ ...route.query });
    router.push({
        name: 'UserUpdate',
        params: { code },
    });
};

const handleRemoveUser = async ({ code }) => {
    const isConfirmed = await confirm('削除しますか？');
    if (!isConfirmed) return;

    try {
        startLoading();
        await removeUser(code);
        await getUsers();
        addToast('削除しました。', 'success');
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};

onMounted(() => {
    getUsers();
});
</script>