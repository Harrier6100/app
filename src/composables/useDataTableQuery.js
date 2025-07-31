import { useFilter } from '@/composables/useFilterQuery';
import { useSort } from '@/composables/useSortQuery';
import { usePagination } from '@/composables/usePaginationQuery';

export const useDataTable = (tableData, pageSize = 10) => {
    const { keyword, filteredData } = useFilter(tableData);
    const { sortedData, sortBy, orderBy } = useSort(filteredData);
    const { page, pageLength, paginatedData } = usePagination(sortedData, pageSize);

    return {
        keyword,
        page,
        pageLength,
        filteredData,
        sortedData,
        paginatedData,
        sortBy,
        orderBy,
    };
};