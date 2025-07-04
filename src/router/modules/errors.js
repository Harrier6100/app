export default [
    {
        path: '/401',
        name: 'Unauthorized',
        component: () => import('@/pages/errors/Unauthorized.vue'),
    },
    {
        path: '/403',
        name: 'Forbidden',
        component: () => import('@/pages/errors/Forbidden.vue'),
    },
];