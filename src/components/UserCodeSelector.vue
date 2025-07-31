<template>
    <teleport to="body">
        <div v-if="isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="emit('close')">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" type="button" @click="emit('close')"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-3">
                                    <input class="form-control" type="text" v-model="keyword" placeholder="検索">
                                </div>
                                <div class="col-9">
                                    <table class="table table-bordered table-hover">
                                        <thead class="table-secondary">
                                            <tr>
                                                <td :class="orderBy('code')" @click="sortBy('code')">アカウント</td>
                                                <td :class="orderBy('name')" @click="sortBy('name')">名前</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in paginatedData" :key="item.code">
                                                <td class="text-start">{{ item.code }}</td>
                                                <td class="text-start">{{ item.name }}</td>
                                                <td class="text-start">
                                                    <div class="d-flex justify-content-center">
                                                        <button class="btn btn-link text-decoration-none p-0" type="button" @click="handleSelect(item)">選択</button>
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
import { ref, watch, onMounted } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useDataTable } from '@/composables/useDataTable';
import { api } from '@/libs/api';
import Message from '@/components/Message.vue';
import Pagination from '@/components/Pagination.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['select', 'close']);

const { isLoading, startLoading, stopLoading } = useLoading();
const items = ref([]);
const { keyword, page, pageLength, paginatedData, sortBy, orderBy } = useDataTable(items, 10);
const errors = ref([]);

onMounted(async () => {
    try {
        startLoading();
        const response = await api.get(`/api/users`);
        items.value = response.data;
    } catch (error) {
        errors.value.error = error.message;
    } finally {
        stopLoading();
    }
});

watch(items, () => {
    page.value = 1;
});

const handleSelect = (item) => {
    emit('select', item);
    emit('close');
};
</script>