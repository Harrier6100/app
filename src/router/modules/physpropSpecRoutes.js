export const physpropSpecRoutes = [
    {
        path: '/physprop/specs',
        name: 'PhyspropSpecList',
        component: () => import('@/views/PhyspropSpecList.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/physprop/specs/add',
        name: 'PhyspropSpecAdd',
        component: () => import('@/views/PhyspropSpecEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/physprop/specs/:code',
        name: 'PhyspropSpecEdit',
        component: () => import('@/views/PhyspropSpecEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];