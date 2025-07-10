<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="emit('close')">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" @click="emit('close')"></button>
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

                            <div class="d-flex justify-content-end gap-3">
                                <button class="btn btn-secondary" @click="emit('close')">キャンセル</button>
                                <button class="btn btn-primary" @click="save">保存</button>
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

const save = () => {
    emit('save', permissions.value);
    emit('close');
};

watch(() => props.modelValue, (newVal) => {
    if (Array.isArray(newVal)) {
        permissions.value = [...newVal];
    }
}, { immediate: true });
</script>