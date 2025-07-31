export const routeMenus = {
    'top': [
        {
            label: '管理',
            subMenu: 'menu#1',
        },
        {
            label: '品質',
            subMenu: 'menu#2',
        },
    ],
    'menu#1': [
        {
            label: 'アカウント管理',
            to: '/users',
            requiresAuth: true,
            roles: ['admin'],
            permissions: [''],
            showInMenu: true,
        },
    ],
    'menu#2': [
        {
            label: '物性規格マスタ',
            to: '/physprop/specs',
            requiresAuth: true,
            roles: [''],
            permissions: [''],
            showInMenu: true,
        },
    ],
};