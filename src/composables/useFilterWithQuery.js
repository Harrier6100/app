import { useFilter } from '@/composables/useFilter';
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';

export const useFilterWithQuery = (filterData) => {
    const filter = useFilter(filterData);
    const route = useRoute();
    const router = useRouter();

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