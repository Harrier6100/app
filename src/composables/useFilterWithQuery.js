import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';
import { useFilter } from '@/composables/useFilter';

export const useFilterWithQuery = (filterData) => {
    const route = useRoute();
    const router = useRouter();
    const filter = useFilter(filterData);

    onMounted(() => {
        if (route.query.keyword) {
            filter.keyword.value = route.query.keyword;
        }
    });

    const updateQuery = debounce(() => {
        router.replace({
            query: {
                ...route.query,
                keyword: filter.keyword.value,
            },
        });
    }, 300);
    watch(filter.keyword, updateQuery);

    return {
        ...filter,
    };
};

export { useFilterWithQuery as useFilter };