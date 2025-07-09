<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show" @click.self="$emit('close')"></div>
            <div class="offcanvas offcanvas-start show">
                <div class="offcanvas-header">
                    <button class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="offcanvas-body overflow-hidden p-0">
                    <div class="position-relative">
                        <transition :name="transitionName">

                            <div class="slide-menu" :key="selectedMenu">
                                <div class="list-group">
                                    <template v-if="selectedMenu === 'topLevel'">

                                        <div v-for="menu in filteredMenus"
                                            :key="menu.subMenu"
                                            class="list-group-item list-group-item-action list-group-item-light rounded-0"
                                            role="button"
                                            @click="pushMenu(menu.subMenu)"
                                        >
                                            <div class="d-flex justify-content-between">
                                                <span>{{ menu.label }}</span>
                                                <i class="bi bi-arrow-right"></i>
                                            </div>
                                        </div>

                                    </template>
                                    <template v-else>

                                        <div
                                            class="list-group-item list-group-item-action list-group-item-light rounded-0"
                                            role="button"
                                            @click="popMenu()"
                                        >
                                            <div class="d-flex justify-content-start gap-1">
                                                <i class="bi bi-arrow-left"></i>
                                                <span>前のメニュー</span>
                                            </div>
                                        </div>

                                        <template v-for="menu in filteredMenus" :key="menu.to || menu.subMenu">
                                            <div v-if="menu.subMenu"
                                                class="list-group-item list-group-item-action list-group-item-light rounded-0"
                                                role="button"
                                                @click="pushMenu(menu.subMenu)"
                                            >
                                                <div class="d-flex justify-content-between">
                                                    <span>{{ menu.label }}</span>
                                                    <i class="bi bi-arrow-right"></i>
                                                </div>
                                            </div>
                                            <router-link v-else-if="menu.to"
                                                class="list-group-item list-group-item-action list-group-item-light rounded-0"
                                                :to="menu.to"
                                                @click="$emit('close')"
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
const isForward = ref(false);

const selectedMenu = computed(() => {
    return menuStack.value.at(-1) || 'topLevel';
});

const filteredMenus = computed(() => {
    const { user } = useUser();
    const role = user.value?.role ?? null;
    const permissions = user.value?.permissions ?? [];
    const menus = routeMenus[selectedMenu.value] || [];

    return menus.filter(menu => {
        if (menu.to) {
            return (
                (((menu.roles?.length || 0) === 0 || menu.roles?.includes(role)) ||
                ((menu.permissions?.length || 0) === 0 || menu.permissions?.some(p => permissions.includes(p)))) &&
                menu.showInMenu
            );
        }

        if (menu.subMenu) {
            const subMenus = routeMenus[menu.subMenu] || [];
            const hasSubMenu = subMenus.some(subMenu => {
                return (
                    (((subMenu.roles?.length || 0) === 0 || subMenu.roles?.includes(role)) ||
                    ((subMenu.permissions?.length || 0) === 0 || subMenu.permissions?.some(p => permissions.includes(p)))) &&
                    subMenu.showInMenu
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

watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
        menuStack.value = [];
    }
});
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