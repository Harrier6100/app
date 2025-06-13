export const settingRoutes = [
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/setting/profile',
        name: 'SettingProfile',
        component: () => import('@/views/SettingProfile.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/setting/profile/name',
        name: 'SettingProfileName',
        component: () => import('@/views/SettingProfileName.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/setting/profile/email',
        name: 'SettingProfileEmail',
        component: () => import('@/views/SettingProfileEmail.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/setting/password',
        name: 'SettingPassword',
        component: () => import('@/views/SettingPassword.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];