export const physpropNameRoutes = [
    {
        path: '/physprop/names',
        name: 'PhyspropNameList',
        component: () => import('@/views/PhyspropNameList.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    // {
    //     path: '/users/add',
    //     name: 'UserAdd',
    //     component: () => import('@/views/UserEdit.vue'),
    //     meta: {
    //         requiresAuth: true,
    //     },
    // },
    // {
    //     path: '/users/:id',
    //     name: 'UserEdit',
    //     component: () => import('@/views/UserEdit.vue'),
    //     meta: {
    //         requiresAuth: true,
    //     },
    // },
];