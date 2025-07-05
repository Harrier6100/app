import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUser } from '@/composables/useUser';
import { flattenRouteMenu } from '@/utils/flattenRouteMenu';
import { routeMenus } from '@/config/routeMenus';

const routes = [];
const routeMeta = flattenRouteMenu(routeMenus);
const modules = import.meta.glob('./modules/*.js', { eager: true });
for (const moduleName in modules) {
    const module = modules[moduleName];
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
    const { isAuth } = useAuth();
    
    // 認証が必要なページか判定
    if (to.meta.requiresAuth) {
        // 認証済か判定
        if (!isAuth.value) {
            // ログイン後、リクエストページへ遷移できるようパスを保存
            sessionStorage.setItem('redirectTo', to.fullPath);
            return next('/401');
        }
        
        const { user } = useUser();
        const role = user.value?.role ?? null;
        const permissions = user.value?.permissions ?? [];

        // ロール or パーミッションがルートのメタデータに設定されているか
        if ((to.meta.roles?.length || 0) > 0 || (to.meta.permissions?.length || 0) > 0) {
            // ロールを比較しアクセス権限を探索
            const hasRole = to.meta.roles?.includes(role) ?? false;
            // パーミッションを比較しアクセス権限を探索
            const hasPermission = to.meta.permissions?.some(p => permissions.includes(p)) ?? false;
            // アクセス権限を持っているか判定
            if (!hasRole && !hasPermission) {
                return next('/403');
            }
        }
    }

    next();
});

export default router;