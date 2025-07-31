import { watch ,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';
import { useFilter } from '@/composables/useFilter';

export const useFilterQuery = (filterData) => {
    const route = useRoute();
    const router = useRouter();
    const filter = useFilter(filterData);
        
    const updateQuery = debounce(() => {
        router.replace({
            query: {
                ...route.query,
                keyword: filter.keyword.value,
            },
        });
    }, 300);
    
    watch(filter.keyword, updateQuery);

    onMounted(() => {
        if (route.query.keyword) {
            filter.keyword.value = route.query.keyword;
        }
    });  

    return {
        ...filter,
    };
};

export { useFilterQuery as useFilter };