import { createRouter, createWebHistory } from 'vue-router';
import { userRoutes } from './modules/users';
import { physpropNameRoutes } from './modules/physpropNames';
import { useAuth } from '@/composables/useAuth';

const routes = [
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    ...userRoutes,
    ...physpropNameRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { isAuth, autoLogin } = useAuth();

    if (!isAuth.value) {
        try {
            await autoLogin();
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