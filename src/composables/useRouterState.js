import { storeToRefs } from 'pinia';
import { useRouterStateStore } from '@/stores/useRouterStateStore';

export const useRouterState = () => {
    const routerStateStore = useRouterStateStore();
    const { routeQuery } = storeToRefs(routerStateStore);

    return {
        routeQuery,
    };
};