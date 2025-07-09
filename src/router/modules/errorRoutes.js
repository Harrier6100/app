export default [
    {
        path: '/401',
        name: 'Unauthorized',
        component: () => import('@/views/errors/401.vue'),
    },
    {
        path: '/403',
        name: 'Forbidden',
        component: () => import('@/views/errors/403.vue'),
    },
];