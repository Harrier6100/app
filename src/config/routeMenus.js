export const routeMenus = {
    'topLevel': [
        {
            label: '管理',
            subMenu: 'management',
        },
    ],
    'management': [
        {
            to: '/users/add',
            label: 'アカウント追加',
            requiresAuth: true,
            roles: ['admin'],
            permissions: [''],
            showInMenu: true,
        },
        {
            to: '/users/:code',
            label: 'アカウント編集',
            requiresAuth: true,
            roles: ['admin'],
            permissions: [''],
            showInMenu: false,
        },
    ],
};