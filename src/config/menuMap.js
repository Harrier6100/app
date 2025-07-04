export const menuMap = {
    'root': [
        {
            label: '管理',
            next: 'management',
        },
    ],
    'management': [
        {
            label: 'アカウント追加',
            showMenu: true,
            to: '/users/add',
            requiresAuth: true,
            roles: ['admin'],
            permissions: ['users:create'],
        },
        {
            label: 'アカウント編集',
            showMenu: false,
            to: '/users/:id',
            requiresAuth: true,
            roles: ['admin'],
            permissions: ['users:update'],
        },
    ],
};