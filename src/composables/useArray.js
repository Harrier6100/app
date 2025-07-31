import { ref } from 'vue';

export const useArray = (initialize = []) => {
    const items = ref([...initialize]);

    const add = (item) => {
        const parsedItem = JSON.parse(JSON.stringify(item));
        items.value.push(parsedItem);
    };

    const push = (index, item) => {
        const parsedItem = JSON.parse(JSON.stringify(item));
        items.value.splice(index + 1, 0, parsedItem);
    };

    const up = (index) => {
        if (index > 0 && index < items.value.length) {
            const [item] = items.value.splice(index, 1);
            items.value.splice(index - 1, 0, item);
        }
    };

    const down = (index) => {
        if (index >= 0 && index < items.value.length - 1) {
            const [item] = items.value.splice(index, 1);
            items.value.splice(index + 1, 0, item);
        }
    };

    const remove = (index) => {
        items.value.splice(index, 1);
    };

    return {
        items,
        add,
        push,
        up,
        down,
        remove,
    };
};