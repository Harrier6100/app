<template>
    <div class="d-flex justify-content-end gap-3">
        <button class="btn btn-secondary" type="button" @click="cancel" :disabled="isLoading">キャンセル</button>
        <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
    </div>
</template>

<script setup>
const props = defineProps({
    isLoading: Boolean,
});
const emit = defineEmits(['cancel']);
const cancel = () => {
    emit('cancel');
};
</script>