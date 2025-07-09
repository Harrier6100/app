export default [
    {
        path: '/users/add',
        name: 'UserAdd',
        component: () => import('@/views/UserEdit.vue'),
    },
    {
        path: '/users/:code',
        name: 'UserEdit',
        component: () => import('@/views/UserEdit.vue'),
    },
];