<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show" @click.self="close"></div>
            <div class="offcanvas offcanvas-start show">
                <div class="offcanvas-header">
                    <button class="btn-close" @click="close"></button>
                </div>
                <div class="offcanvas-body overflow-hidden p-0">
                    <div class="position-relative">
                        <transition :name="transitionName">
                            <div class="slide-menu" :key="currentMenu">
                                <div class="list-group">
                                    <template v-if="currentMenu === 'topLevel'">
                                        <template v-for="menu in filteredMenus" :key="menu.submenu">
                                            <div class="list-group-item list-group-item-action list-group-item-light rounded-0" role="button" @click="pushMenu(menu.submenu)">
                                                <div class="d-flex justify-content-between">
                                                    <span>{{ menu.label }}</span>
                                                    <i class="bi bi-arrow-right"></i>
                                                </div>
                                            </div>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <div class="list-group-item list-group-item-action list-group-item-light rounded-0" role="button" @click="popMenu()">
                                            <div class="d-flex justify-content-start gap-1">
                                                <i class="bi bi-arrow-left"></i>
                                                <span>前のメニュー</span>
                                            </div>
                                        </div>
                                        <template v-for="menu in filteredMenus" :key="menu.to || menu.submenu">
                                            <template v-if="menu.submenu">
                                                <div class="list-group-item list-group-item-action list-group-item-light rounded-0" role="button" @click="pushMenu(menu.submenu)">
                                                    <div class="d-flex justify-content-between">
                                                        <span>{{ menu.label }}</span>
                                                        <i class="bi bi-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else-if="menu.to">
                                                <router-link class="list-group-item list-group-item-action list-group-item-light rounded-0" :to="menu.to" @click="close">
                                                    <div class="d-flex justify-content-start">
                                                        <span>{{ menu.label }}</span>
                                                    </div>
                                                </router-link>
                                            </template>
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
const isForward = ref(false);

watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
        menuStack.value = [];
    }
});

const currentMenu = computed(() => {
    return menuStack.value.at(-1) || 'topLevel';
});

const filteredMenus = computed(() => {
    const { user } = useUser();
    const role = user.value?.role ?? null;
    const permissions = user.value?.permissions ?? [];
    const menus = routeMenus[currentMenu.value] || [];

    return menus.filter(menu => {
        if (menu.to) {
            return (
                ((menu.roles?.length || 0) === 0 || menu.roles?.includes(role)) &&
                ((menu.permissions?.length || 0) === 0 || menu.permissions?.some(p => permissions.includes(p))) &&
                (menu.showInMenu)
            );
        }

        if (menu.submenu) {
            const subMenus = routeMenus[menu.submenu] || [];
            const hasSubMenu = subMenus.some(subMenu => {
                return (
                    ((subMenu.roles?.length || 0) === 0 || subMenu.roles?.includes(role)) &&
                    ((subMenu.permissions?.length || 0) === 0 || subMenu.permissions?.some(p => permissions.includes(p))) &&
                    (subMenu.showInMenu)
                );
            });
            return hasSubMenu;
        }

        return true;
    });
});

const transitionName = computed(() => {
    return isForward.value ? 'slide-forward' : 'slide-back';
});

const pushMenu = (menu) => {
    menuStack.value.push(menu);
    isForward.value = true;
};

const popMenu = () => {
    menuStack.value.pop();
    isForward.value = false;
};

const close = () => {
    emit('close');
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