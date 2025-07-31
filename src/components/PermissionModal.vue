<template>
    <teleport to="body">
        <div v-if="isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="emit('close')">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" type="button" @click="emit('close')"></button>
                        </div>
                        <div class="modal-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td class="text-start">リソース</td>
                                        <td class="text-center">閲覧</td>
                                        <td class="text-center">作成</td>
                                        <td class="text-center">更新</td>
                                        <td class="text-center">削除</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(permissionAction, key) in permissionActions" :key="key">
                                        <td>{{ permissionAction.label }}</td>
                                        <td v-for="action in actions" :key="action">
                                            <div class="d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" :value="permissionAction.actions[action]" v-model="permissions">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="d-flex justify-content-end gap-3">
                                <button class="btn btn-secondary" type="button" @click="emit('close')">キャンセル</button>
                                <button class="btn btn-primary" type="button" @click="handleSave">保存</button>
                            </div>
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
const actions = ['view', 'create', 'update', 'remove'];

watch(() => props.modelValue, (value) => {
    if (Array.isArray(value)) {
        permissions.value = [...value];
    }
}, { immediate: true });

const handleSave = () => {
    emit('save', permissions.value);
    emit('close');
};
</script>