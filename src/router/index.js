import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUser } from '@/composables/useUser';
import { flattenRouteMenu } from '@/utils/flattenRouteMenu';
import { routeMenus } from '@/config/routeMenus';

const routes = [];
const routeMeta = flattenRouteMenu(routeMenus);
const modules = import.meta.glob('./modules/*.js', { eager: true });
for (const key in modules) {
    const module = modules[key];
    const routeDefs = Array.isArray(module.default) ? module.default : [module.default];
    routeDefs.forEach(route => {
        routes.push({
            ...route,
            meta: {
                ...(route.meta || {}),
                ...(routeMeta[route.path] || {}),
            },
        });
    });
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { isAuth, authAutoLogin } = useAuth();

    if (!isAuth.value) {
        await authAutoLogin();
    }

    if (to.meta.requiresAuth) {
        if (!isAuth.value) {
            sessionStorage.setItem('redirectTo', to.fullPath);
            return next('/401');
        }

        const { user } = useUser();
        const role = user.value?.role ?? null;
        const permissions = user.value?.permissions ?? [];

        if ((to.meta.roles?.length || 0) > 0 || (to.meta.permissions?.length || 0) > 0) {
            const hasRole = to.meta.roles?.includes(role) ?? false;
            const hasPermission = to.meta.permissions?.some(p => permissions.includes(p)) ?? false;
            if (!hasRole && !hasPermission) {
                return next('/403');
            }
        }
    }

    next();
});

export default router;