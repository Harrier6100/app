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

                        <template v-if="menu === 'root'">
                            <div v-for="item in filteredMenus" :key="item.next">
                                <div class="d-flex flex-row p-3" role="button" @click="pushMenu(item.next)">
                                    <div class="flex-shrink-0">{{ item.label }}</div>
                                    <div class="d-flex w-100">
                                        <i class="bi bi-arrow-right ms-auto"></i>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="d-flex flex-row p-3" role="button" @click="popMenu()">
                                <div class="flex-shrink-0">
                                    <i class="bi bi-arrow-left me-1"></i>
                                </div>
                                <div class="d-flex w-100">前へ</div>
                            </div>
                            <div v-for="item in filteredMenus" :key="item.to || item.next">
                                <div v-if="item.next" class="d-flex flex-row p-3" role="button" @click="pushMenu(item.next)">
                                    <div class="flex-shrink-0">{{ item.label }}</div>
                                    <div class="d-flex w-100">
                                        <i class="bi bi-arrow-right ms-auto"></i>
                                    </div>
                                </div>
                                <router-link v-else-if="item.to" class="text-dark text-decoration-none" :to="item.to" @click="close">
                                    <div class="d-flex flex-row p-3" role="button">
                                        <div class="flex-shrink-0">{{ item.label }}</div>
                                    </div>
                                </router-link>
                            </div>
                        </template>

                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUser } from '@/composables/useUser';
import { flattenMenuMap } from '@/utils/flattenMenuMap';
import { menuMap } from '@/config/menuMap';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);
const { user } = useUser();
const menuStack = ref([]);
const isForward = ref(false);

watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
        menuStack.value = [];
    }
});

const menu = computed(() => {
    return menuStack.value.at(-1) || 'root';
});

const filteredMenus = computed(() => {
    const role = user.value?.role ?? null;
    const permissions = user.value?.permissions ?? [];
    const items = menuMap[menu.value] || [];

    return items.filter(item => {
        if (item.to) {
            return (
                ((item.roles?.length || 0) === 0 || item.roles?.includes(role)) &&
                ((item.permissions?.length || 0) === 0 || item.permissions?.some(p => permissions.includes(p))) &&
                (item.showMenu)
            );
        }

        if (item.next) {
            const subItems = menuMap[item.next] || [];
            const hasSubItem = subItems.some(subItem => {
                return (
                    ((subItem.roles?.length || 0) === 0 || subItem.roles?.includes(role)) &&
                    ((subItem.permissions?.length || 0) === 0 || subItem.permissions?.some(p => permissions.includes(p))) &&
                    (subItem.showMenu)
                );
            });
            return hasSubItem;
        }

        return true;
    });
});

const pushMenu = (next) => {
    menuStack.value.push(next);
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