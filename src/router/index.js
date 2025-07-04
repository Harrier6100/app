import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUser } from '@/composables/useUser';
import { flattenMenuMap } from '@/utils/flattenMenuMap';
import { menuMap } from '@/config/menuMap';

const routes = [];
const metaMap = flattenMenuMap(menuMap);
const modules = import.meta.glob('./modules/*.js', { eager: true });
for (const module in modules) {
    const mod = modules[module];
    const routeDefs = Array.isArray(mod.default) ? mod.default : [mod.default];
    routeDefs.forEach(route => {
        const meta = metaMap[route.path] || {};
        routes.push({
            ...route,
            meta: {
                ...(route.meta || {}),
                ...meta,
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
    const { user } = useUser();

    // 認証が必要なページか判定
    // 必要かどうかのフラグは各ページ毎に設定
    if (to.meta.requiresAuth) {

        // 認証済か判定
        if (!isAuth.value) {
            // ログイン後、アクセスページへ遷移できるようパスを保存
            sessionStorage.setItem('redirectTo', to.fullPath);
            return next('/401');
        }

        // ロール or 権限が設定されているか
        if ((to.meta.roles?.length || 0) > 0 || (to.meta.permissions?.length || 0) > 0) {
            const role = user.value?.role ?? null;
            const permissions = user.value?.permissions ?? [];
            // ロール情報を比較し権限を探索
            const hasRole = to.meta.roles?.includes(role) ?? false;
            // パーミッション情報を比較し権限を探索
            const hasPermission = to.meta.permissions?.some(p => permissions.includes(p)) ?? false;
            // 権限を持っているか判定
            if (!hasRole && !hasPermission) {
                return next('/403');
            }
        }

    }

    next();
});

export default router;