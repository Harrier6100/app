export default [
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/settings/Setting.vue'),
    },
    {
        path: '/setting/password',
        name: 'SettingPassword',
        component: () => import('@/views/settings/SettingPassword.vue'),
    },
];