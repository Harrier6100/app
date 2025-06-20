export const physpropValueRoutes = [
    // {
    //     path: '/physprop/specs',
    //     name: 'PhyspropSpecList',
    //     component: () => import('@/views/PhyspropSpecList.vue'),
    //     meta: {
    //         requiresAuth: true,
    //     },
    // },
    {
        path: '/physprop/values/add',
        name: 'PhyspropValueAdd',
        component: () => import('@/views/PhyspropValueEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    // {
    //     path: '/physprop/specs/:productCode/:customerCode?',
    //     name: 'PhyspropSpecEdit',
    //     component: () => import('@/views/PhyspropSpecEdit.vue'),
    //     meta: {
    //         requiresAuth: true,
    //     },
    // },
];