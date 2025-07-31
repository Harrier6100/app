import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouterStateStore = defineStore('routerState', () => {
    const routerState = ref({});

    const getState = () => {
        return routerState.value;
    };

    const setState = (state) => {
        routerState.value = state;
    };
    
    return {
        routerState,
        getState,
        setState,
    };
});