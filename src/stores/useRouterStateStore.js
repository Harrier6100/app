import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouterStateStore = defineStore('routerState', () => {
    const routeQuery = ref({});

    return {
        routeQuery,
    };
});