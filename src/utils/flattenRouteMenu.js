export const flattenRouteMenu = (routeMenus) => {
    const routeMeta = {};

    const recursive = (menus) => {
        if (!Array.isArray(menus)) return;

        for (const menu of menus) {
            if (menu.to) {
                routeMeta[menu.to] = {
                    label: menu.label,
                    requiresAuth: menu.requiresAuth ?? false,
                    roles: menu.roles ?? [],
                    permissions: menu.permissions ?? [],
                };
            }

            if (menu.subMenu && routeMenus[menu.subMenu]) {
                recursive(routeMenus[menu.subMenu]);
            }
        }
    };

    recursive(routeMenus['top']);

    return routeMeta;
};