import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePagination } from '@/composables/usePagination';

export const usePaginationQuery = (paginationData, pageSize) => {
    const route = useRoute();
    const router = useRouter();
    const pagination = usePagination(paginationData, pageSize);

    const updateQuery = () => {
        router.replace({
            query: {
                ...route.query,
                page: pagination.page.value,
            },
        });
    };
    
    watch(pagination.page, updateQuery);

    onMounted(() => {
        if (route.query.page) {
            pagination.page.value = Number(route.query.page);
        }
    });

    return {
        ...pagination,
    };
};

export { usePaginationQuery as usePagination };