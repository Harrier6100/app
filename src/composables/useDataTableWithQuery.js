import { useFilter } from '@/composables/useFilterWithQuery';
import { useSort } from '@/composables/useSortWithQuery';
import { usePagination } from '@/composables/usePaginationWithQuery';

export const useDataTable = (tableData) => {
    const { keyword, filteredData } = useFilter(tableData);
    const { sortedData, sortBy, orderBy } = useSort(filteredData);
    const { page, pageLength, paginatedData } = usePagination(sortedData, 10);

    return {
        keyword,
        page,
        pageLength,
        paginatedData,
        sortBy,
        orderBy,
    };
};