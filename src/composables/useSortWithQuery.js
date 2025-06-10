import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSort } from '@/composables/useSort';

export const useSortWithQuery = (sortData) => {
    const route = useRoute();
    const router = useRouter();
    const sort = useSort(sortData);

    onMounted(() => {
        if (route.query.sort && route.query.order) {
            sort.sort.value = route.query.sort;
            sort.order.value = route.query.order;
        }
    });

    const updateQuery = () => {
        router.replace({
            query: {
                ...route.query,
                sort: sort.sort.value,
                order: sort.order.value,
            },
        });
    };
    watch([sort.sort, sort.order], updateQuery);

    return {
        ...sort,
    };
};

export { useSortWithQuery as useSort };