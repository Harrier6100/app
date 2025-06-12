import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { settingRoutes } from './modules/settings';
import { userRoutes } from './modules/users';
import { physpropNameRoutes } from './modules/physpropNames';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/error',
        name: 'Error',
        component: () => import('@/views/Error.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    ...settingRoutes,
    ...userRoutes,
    ...physpropNameRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { isAuth, authAutoLogin } = useAuth();

    if (to.path === '/error') {
        return next();
    }

    if (!isAuth.value) {
        try {
            await authAutoLogin();
        } catch (error) {
            return next('/error');
        }
    }

    if (!isAuth.value && to.meta.requiresAuth) {
        sessionStorage.setItem('redirectTo', to.fullPath);
        return next('/error');
    }

    next();
});

export default router;