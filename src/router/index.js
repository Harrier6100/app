import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import UserRoutes from './modules/userRoutes';

const routes = [
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile'),
        meta: {
            requiresAuth: true,
        },
    },
    ...UserRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();

    if (!auth.isAuth) {
        try {
            await auth.autoSignin();
        } catch (error) {
            return next('/auth/error');
        }
    }

    if (!auth.isAuth && to.meta.requiresAuth) {
        sessionStorage.setItem('redirectTo', to.fullPath);
        return next('/auth/error');
    }

    next();
});

export default router;