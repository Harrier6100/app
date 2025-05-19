<template>
    <div class="container-fluid">
        <div class="mb-3">
            <h6>アカウント</h6>
        </div>
        <div class="mb-3">
            <div class="d-flex justify-content-between mb-3">
                <input class="form-control w-25" v-model="search" :disabled="isLoading" placeholder="検索">
                <button class="btn btn-primary" @click="addUser" :disabled="isLoading">新規作成</button>
            </div>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th :class="orderBy('id')" @click="sortBy('id')">id</th>
                        <th :class="orderBy('name')" @click="sortBy('name')">名前</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedData" :key="user.id">
                        <td class="text-start">{{ user.id }}</td>
                        <td class="text-start">{{ user.name }}</td>
                    </tr>
                </tbody>
            </table>
            <Pagination v-if="pages > 1"
                v-bind="{ page, pages }"
                @prevPage="prevPage"
                @nextPage="nextPage"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useSearch } from '@/composables/useSearch';
import { useSort } from '@/composables/useSort';
import { usePagination } from '@/composables/usePagination';
import api from '@/services/api';
import Pagination from '@/components/Pagination';

const { isLoading, startLoading, stopLoading } = useLoading();
const users = ref([]);
const { search, filteredData } = useSearch(users);
const { sortedData, sortBy, orderBy } = useSort(filteredData);
const { page, pages, paginatedData, prevPage, nextPage } = usePagination(sortedData, 10);

onMounted(() => {
    fetchUsers();
});

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
</script>