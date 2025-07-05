export const routeMenus = {
    'topLevel': [
        {
            label: '管理',
            submenu: 'management',
        },
    ],
    'management': [
        {
            to: '/users/add',
            label: 'アカウント追加',
            requiresAuth: true,
            roles: ['admin'],
            permissions: ['users:create'],
            showInMenu: true,
        },
        {
            to: '/users/:id',
            label: 'アカウント編集',
            requiresAuth: true,
            roles: ['admin'],
            permissions: ['users:update'],
            showInMenu: false,
        },
    ],
};