import { ref, computed } from 'vue';

export const usePagination = (paginationData, pageSize) => {
    const page = ref(1);

    const pages = computed(() => {
        return Math.ceil(paginationData.value.length / pageSize);
    });

    const paginatedData = computed(() => {
        const startIndex = (page.value - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return paginationData.value.slice(startIndex, endIndex);
    });

    const prevPage = () => {
        if (page.value > 1) {
            page.value--;
        }
    };

    const nextPage = () => {
        if (page.value < pages.value) {
            page.value++;
        }
    };

    return {
        page,
        pages,
        paginatedData,
        prevPage,
        nextPage,
    };
};