import { useFilter } from '@/composables/useFilter';
import { useSort } from '@/composables/useSort';
import { usePagination } from '@/composables/usePagination';

export const useDataTable = (tableData, pageSize = 10) => {
    const { keyword, filteredData } = useFilter(tableData);
    const { sortedData, sortBy, orderBy } = useSort(filteredData);
    const { page, pageLength, paginatedData } = usePagination(sortedData, pageSize);

    return {
        keyword,
        page,
        pageLength,
        paginatedData,
        sortBy,
        orderBy,
    };
};