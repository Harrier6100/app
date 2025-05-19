import { ref } from 'vue';

export const useArray = (init = []) => {
    const items = ref([...init]);

    const add = (item) => {
        const parsedItem = JSON.parse(JSON.stringify(item));
        items.value.push(parsedItem);
    };

    const push = (index, item) => {
        const parsedItem = JSON.parse(JSON.stringify(item));
        items.value.splice(index + 1, 0 , parsedItem);
    };

    const move = (oldIndex, newIndex) => {
        if (newIndex < 0) return;
        const [moveItem] = items.value.splice(oldIndex, 1);
        items.value.splice(newIndex, 0, moveItem);
    };

    const remove = (index) => {
        items.value.splice(index, 1);
    };

    return {
        items,
        add,
        push,
        move,
        remove,
    };
};