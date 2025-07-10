export default [
    {
        path: '/users',
        name: 'UserList',
        component: () => import('@/views/UserList.vue'),
    },
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