export default [
    {
        path: '/users/add',
        name: 'UserAdd',
        component: () => import('@/pages/UserEdit.vue'),
    },
    {
        path: '/users/:id',
        name: 'UserEdit',
        component: () => import('@/pages/UserEdit.vue'),
    },
];