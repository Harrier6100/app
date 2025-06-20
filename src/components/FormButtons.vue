<template>
    <div class="d-flex justify-content-end gap-3">
        <button class="btn btn-secondary" type="button" @click="cancel" :disabled="isLoading || isAsyncLoading">キャンセル</button>
        <button class="btn btn-primary" type="submit" :disabled="isLoading || isAsyncLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    isLoading: Boolean,
    isAsyncLoading: Boolean,
});
const emit = defineEmits(['cancel']);
const cancel = () => {
    emit('cancel');
};
</script>