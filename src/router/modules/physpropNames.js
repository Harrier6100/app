export const physpropNameRoutes = [
    {
        path: '/physprop/names',
        name: 'PhyspropNameList',
        component: () => import('@/views/PhyspropNameList.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/physprop/names/add',
        name: 'PhyspropNameAdd',
        component: () => import('@/views/PhyspropNameEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/physprop/names/:code',
        name: 'PhyspropNameEdit',
        component: () => import('@/views/PhyspropNameEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];