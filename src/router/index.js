import { createRouter, createWebHistory } from 'vue-router';

const routes = [];
const modules = import.meta.glob('./modules/*.js', { eager: true });
for (const module in modules) {
    routes.push(...modules[module].default ?? modules[module]);
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;