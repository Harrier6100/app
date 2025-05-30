import { usePagination } from '@/composables/usePagination';
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePaginationWithQuery = (paginationData, perPageSize) => {
    const pagination = usePagination(paginationData, perPageSize);
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
        if (route.query.page) {
            pagination.currentPage.value = Number(route.query.page);
        }
    });

    const updateQuery = () => {
        router.replace({
            query: {
                ...route.query,
                page: pagination.currentPage.value,
            },
        });
    };
    watch(pagination.currentPage, updateQuery);

    return {
        ...pagination,
    };
};