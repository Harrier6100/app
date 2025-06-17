import { watch } from 'vue';
import { debounce } from 'lodash';

export const useDebounceWatch = (source, callback, delay = 500, options = {}) => {
    const debounceCallback = debounce(callback, delay);
    watch(source, (newVal, oldVal) => {
        debounceCallback(newVal, oldVal);
    }, options);
};