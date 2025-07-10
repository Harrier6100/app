import { useUser } from '@/composables/useUser';

export const usePermission = () => {
    const has = (permission) => {
        const { role, permissions } = useUser();
        return role.value === 'admin' || permissions.value.includes(permission);
    }

    return {
        has,
    };
};