import { storeToRefs } from 'pinia';
import { useRouterStateStore } from '@/stores/useRouterStateStore';

export const useRouterState = () => {
    const routerStateStore = useRouterStateStore();
    const { routerState } = storeToRefs(routerStateStore);
    const { getState, setState } = routerStateStore;

    return {
        routerState,
        getState,
        setState,
    };
};