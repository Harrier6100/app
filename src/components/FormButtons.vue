<template>
    <div class="d-flex justify-content-end gap-3">
        <button class="btn btn-secondary" type="button" @click="$emit('cancel')" :disabled="isLoading">キャンセル</button>
        <button class="btn btn-primary" :disabled="isLoading">
            <span v-if="isAsync" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    isLoading: Boolean,
    isAsync: Boolean,
});
const emit = defineEmits(['cancel']);
</script>