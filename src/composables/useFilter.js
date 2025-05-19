import { ref, computed } from 'vue';

export const useFilter = (filterData) => {
    const search = ref('');

    const filteredData = computed(() => {
        return filterData.value.filter(data => {
            return Object.values(data).some(value => {
                return value && value.toString().toLowerCase().includes(search.value.toLowerCase());
            });
        });
    });

    return {
        search,
        filteredData,
    };
};