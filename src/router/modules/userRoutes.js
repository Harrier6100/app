const UserRoutes = [
    {
        path: '/users',
        name: 'UserList',
        component: () => import('@/views/UserList'),
        meta: {
            requiresAuth: true,
        },
    },
];

export default UserRoutes;