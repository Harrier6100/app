export default [
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting.vue')
    },
    {
        path: '/setting/profile',
        name: 'SettingProfile',
        component: () => import('@/views/SettingProfile.vue')
    },
    {
        path: '/setting/profile/email',
        name: 'SettingProfileEmail',
        component: () => import('@/views/SettingProfileEmail.vue')
    },
    {
        path: '/setting/profile/name',
        name: 'SettingProfileName',
        component: () => import('@/views/SettingProfileName.vue')
    },
    {
        path: '/setting/password',
        name: 'SettingPassword',
        component: () => import('@/views/SettingPassword.vue')
    },
];