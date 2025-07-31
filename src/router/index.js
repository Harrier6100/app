import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUser } from '@/composables/useUser';
import { flattenRouteMenu } from '@/utils/flattenRouteMenu';
import { routeMenus } from '@/config/routeMenus';

const routes = [];
const routeMeta = flattenRouteMenu(routeMenus);
const modules = import.meta.glob('./modules/*.js', { eager: true });
for (const key in modules) {
    const route = modules[key];
    const routeDefs = Array.isArray(route.default) ? route.default : [route.default];
    routeDefs.forEach(routeDef => {
        routes.push({
            ...routeDef,
            meta: {
                ...(routeDef.meta || {}),
                ...(routeMeta[routeDef.path] || {}),
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
    const { role, permissions } = useUser();

    if (!isAuth.value) {
        try {
            await authAutoLogin();
        } catch (error) {
            console.error(error);
            return next('/401');
        }
    }

    if (to.meta.requiresAuth) {
        if (!isAuth.value) {
            sessionStorage.setItem('redirect', to.fullPath);
            return next('/401');
        }

        if ((to.meta.roles?.length || 0) > 0 || (to.meta.permissions?.length || 0) > 0) {
            const hasRole = to.meta.roles?.includes(role.value) ?? false;
            const hasPermission = to.meta.permissions?.some(p => permissions.value.includes(p)) ?? false;
            if (!hasRole && !hasPermission) {
                return next('/403');
            }
        }
    }

    next();
});

export default router;