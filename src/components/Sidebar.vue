<template>
    <teleport to="body">
        <div v-if="isOpen">
            <div class="offcanvas-backdrop show" @click.self="emit('close')"></div>
            <div class="offcanvas offcanvas-start show">
                <div class="offcanvas-header">
                    <button class="btn-close" type="button" @click="emit('close')"></button>
                </div>
                <div class="offcanvas-body overflow-hidden p-0">
                    <div class="position-relative">
                        <transition :name="transitionName">
                            <div class="slide-menu" :key="currentMenu">
                                <div class="list-group">
                                    <template v-if="currentMenu === 'top'">
                                        <div v-for="menu in filteredMenu"
                                            :key="menu.subMenu"
                                            :class="menuItemClass"
                                            role="button"
                                            @click="pushMenu(menu.subMenu)"
                                        >
                                        <div class="d-flex justify-content-between">
                                                <span>{{ menu.label }}</span>
                                                <i class="bi bi-chevron-right"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div :class="menuItemClass"
                                            role="button"
                                            @click="popMenu"
                                        >
                                            <div class="d-flex justify-content-start gap-1">
                                                <i class="bi bi-chevron-left"></i>
                                                <span>戻る</span>
                                            </div>
                                        </div>
                                        <template v-for="menu in filteredMenu" :key="menu.to || menu.subMenu">
                                            <div v-if="menu.subMenu"
                                                :class="menuItemClass"
                                                role="button"
                                                @click="pushMenu(menu.subMenu)"
                                            >
                                                <div class="d-flex justify-content-between">
                                                    <span>{{ menu.label }}</span>
                                                    <i class="bi bi-chevron-right"></i>
                                                </div>
                                            </div>
                                            <router-link v-else-if="menu.to"
                                                :class="menuItemClass"
                                                :to="menu.to"
                                                @click="emit('close')"
                                            >
                                                <div class="d-flex justify-content-start">
                                                    <span>{{ menu.label }}</span>
                                                </div>
                                            </router-link>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUser } from '@/composables/useUser';
import { routeMenus } from '@/config/routeMenus';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const menuStack = ref([]);
const isForwardMenu = ref(false);

watch(() => props.isOpen, (value) => {
    if (!value) {
        menuStack.value = [];
    }
});

const currentMenu = computed(() => {
    return menuStack.value.at(-1) || 'top';
});

const filteredMenu = computed(() => {
    const { role, permissions } = useUser();
    const menus = routeMenus[currentMenu.value] || [];

    return menus.filter(menu => {
        if (menu.to) {
            return (
                menu.showInMenu &&
                (((menu.roles?.length || 0) === 0 || menu.roles?.includes(role.value)) ||
                ((menu.permissions?.length || 0) === 0 || menu.permissions?.some(p => permissions.value.includes(p))))
            );
        }

        if (menu.subMenu) {
            const subMenus = routeMenus[menu.subMenu] || [];
            const hasSubMenu = subMenus.some(subMenu => {
                return (
                    subMenu.showInMenu &&
                    (((subMenu.roles?.length || 0) === 0 || subMenu.roles?.includes(role.value)) ||
                    ((subMenu.permissions?.length || 0) === 0 || subMenu.permissions?.some(p => permissions.value.includes(p))))
                );
            });
            return hasSubMenu;
        }

        return true;
    });
});

const transitionName = computed(() => {
    return isForwardMenu.value ? 'slide-forward' : 'slide-back';
});

const menuItemClass = computed(() => [
    'list-group-item',
    'list-group-item-action',
    'list-group-item-light',
    'rounded-0',
]);

const pushMenu = (menu) => {
    menuStack.value.push(menu);
    isForwardMenu.value = true;
};

const popMenu = () => {
    menuStack.value.pop();
    isForwardMenu.value = false;
};
</script>

<style scoped>
.slide-menu {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

/* 進むとき: 左→右 */
.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition: all 0.3s ease;
}

.slide-forward-enter-from {
  transform: translateX(100%);
}
.slide-forward-leave-to {
  transform: translateX(-100%);
}

/* 戻るとき: 右→左 */
.slide-back-enter-from {
  transform: translateX(-100%);
}
.slide-back-leave-to {
  transform: translateX(100%);
}
</style>