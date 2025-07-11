export default [
    {
        path: '/settings',
        name: 'Setting',
        component: () => import('@/views/settings/Setting.vue'),
    },
    {
        path: '/settings/password',
        name: 'SettingPassword',
        component: () => import('@/views/settings/SettingPassword.vue'),
    },
    {
        path: '/settings/profiles',
        name: 'SettingProfile',
        component: () => import('@/views/settings/SettingProfile.vue'),
    },
    {
        path: '/settings/profiles/name',
        name: 'SettingProfileName',
        component: () => import('@/views/settings/SettingProfileName.vue'),
    },
    {
        path: '/settings/profiles/email',
        name: 'SettingProfileEmail',
        component: () => import('@/views/settings/SettingProfileEmail.vue'),
    },
    {
        path: '/sandbox',
        name: 'SandBox',
        component: () => import('@/views/SandBox.vue'),
    },
];