export const flattenRouteMenu = (routeMenus) => {
    const meta = {};

    const recursive = (menus) => {
        if (!Array.isArray(menus)) return;

        for (const menu of menus) {
            if (menu.to) {
                meta[menu.to] = {
                    label: menu.label,
                    requiresAuth: menu.requiresAuth ?? false,
                    roles: menu.roles ?? [],
                    permissions: menu.permissions ?? [],
                };
            }

            if (menu.submenu && routeMenus[menu.submenu]) {
                recursive(routeMenus[menu.submenu]);
            }
        }
    };

    recursive(routeMenus['topLevel']);

    return meta;
};