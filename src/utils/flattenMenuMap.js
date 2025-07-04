export const flattenMenuMap = (menuMap) => {
    const metaMap = {};

    const walk = (group) => {
        if (!Array.isArray(group)) return;

        for (const item of group) {
            if (item.to) {
                metaMap[item.to] = {
                    label: item.label,
                    roles: item.roles ?? [],
                    permissions: item.permissions ?? [],
                    showMenu: item.showMenu ?? false,
                    requiresAuth: item.requiresAuth ?? false,
                };
            }

            if (item.next && menuMap[item.next]) {
                walk(menuMap[item.next]);
            }
        }
    };

    walk(menuMap['root']);

    return metaMap;
};