import { useSort } from '@/composables/useSort';
import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useSortWithQuery = (sortData) => {
    const sort = useSort(sortData);
    const route = useRoute();
    const router = useRouter();

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
    watch(sort.order, updateQuery);

    return {
        ...sort,
    };
};