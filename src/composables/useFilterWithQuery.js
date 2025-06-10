import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';
import { useFilter } from '@/composables/useFilter';

export const useFilterWithQuery = (filterData) => {
    const route = useRoute();
    const router = useRouter();
    const filter = useFilter(filterData);

    onMounted(() => {
        if (route.query.search) {
            filter.search.value = route.query.search;
        }
    });

    const updateQuery = debounce(() => {
        router.replace({
            query: {
                ...route.query,
                search: filter.search.value,
            },
        });
    }, 300);
    watch(filter.search, updateQuery);

    return {
        ...filter,
    };
};

export { useFilterWithQuery as useFilter };