import { ref, computed } from 'vue';

export const usePagination = (paginationData, perPageSize) => {
    const currentPage = ref(1);

    const totalPage = computed(() => {
        return Math.ceil(paginationData.value.length / perPageSize);
    });

    const paginatedData = computed(() => {
        const startIndex = (currentPage.value - 1) * perPageSize;
        const endIndex = startIndex + perPageSize;
        return paginationData.value.slice(startIndex, endIndex);
    });

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    };

    const nextPage = () => {
        if (currentPage.value < totalPage.value) {
            currentPage.value++;
        }
    };

    return {
        currentPage,
        totalPage,
        paginatedData,
        prevPage,
        nextPage,
    };
};