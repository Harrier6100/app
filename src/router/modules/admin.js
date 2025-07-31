export default [
    {
        path: '/users',
        name: 'UserList',
        component: () => import('@/views/UserList.vue')
    },
    {
        path: '/users/new',
        name: 'UserCreate',
        component: () => import('@/views/UserEdit.vue')
    },
    {
        path: '/users/:code',
        name: 'UserUpdate',
        component: () => import('@/views/UserEdit.vue')
    },
];