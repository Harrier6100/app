import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import UserRoutes from './modules/userRoutes';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/auth/error',
        name: 'AuthError',
        component: () => import('@/views/AuthError'),
        meta: {
            requiresAuth: false,
        },
    },
    ...UserRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (!authStore.isAuth) {
        await authStore.autoSignin();
    }

    if (!authStore.isAuth && to.meta.requiresAuth) {
        sessionStorage.setItem('redirectTo', to.fullPath);
        return next('/auth/error');
    }

    next();
});

export default router;