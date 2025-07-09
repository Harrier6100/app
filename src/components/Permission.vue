<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="close">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" @click="close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td>リソース</td>
                                        <td>閲覧</td>
                                        <td>作成</td>
                                        <td>編集</td>
                                        <td>削除</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(permissionAction, key) in permissionActions" :key="key">
                                        <td>{{ permissionAction.label }}</td>
                                        <td v-for="action in actions" :key="action">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                :value="permissionAction.actions[action]"
                                                v-model="permissions"
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { permissionActions } from '@/config/permissionActions';

const props = defineProps({
    isOpen: Boolean,
    modelValue: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['save', 'close']);
const permissions = ref([]);
const actions = ['read', 'create', 'update', 'delete'];

const close = () => {
    emit('save', permissions.value);
    emit('close');
};

watch(() => props.modelValue, (newVal) => {
    if (Array.isArray(newVal)) {
        permissions.value = [...newVal];
    }
}, { immediate: true });
</script>