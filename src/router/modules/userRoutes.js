export const userRoutes = [
    {
        path: '/users',
        name: 'UserList',
        component: () => import('@/views/UserList.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/users/add',
        name: 'UserAdd',
        component: () => import('@/views/UserEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/users/:id',
        name: 'UserEdit',
        component: () => import('@/views/UserEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];