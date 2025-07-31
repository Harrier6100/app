import { ref, computed } from 'vue';

export const useSort = (sortData) => {
    const sort = ref(null);
    const order = ref(null);

    const sortedData = computed(() => {
        return [...sortData.value].sort((a, b) => {
            const aValue = a[sort.value];
            const bValue = b[sort.value];
            const set = order.value === 'asc' ? 1 : -1;

            if (aValue === null || bValue === null) {
                return (aValue === null ? 1 : -1) * set;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue, 'ja', { sensitivity: 'base' }) * set;
            }

            const aNumber = +aValue;
            const bNumber = +bValue;
            if (!isNaN(aNumber) && !isNaN(bNumber)) {
                return (aNumber - bNumber) * set;
            }

            return (aValue > bValue ? 1 : aValue < bValue ? -1 : 0) * set;
        });
    });

    const sortBy = (key) => {
        if (sort.value === key) {
            order.value = order.value === 'asc' ? 'desc' : 'asc';
        } else {
            sort.value = key;
            order.value = 'asc';
        }
    };

    const orderBy = (key) => {
        return {
            asc: sort.value === key && order.value === 'asc',
            desc: sort.value === key && order.value === 'desc',
        };
    };

    return {
        sort,
        order,
        sortedData,
        sortBy,
        orderBy,
    };
};