<template>
    <div class="mb-3">
        <router-link to="/setting/profile" class="text-decoration-none text-dark">
            <i class="bi bi-arrow-left me-2"></i>プロフィール
        </router-link>
    </div>

    <form @submit.prevent="save" autocomplete="off">
        <div class="mb-3">
            <label class="form-label" for="name">名前</label>
            <input class="form-control" type="text" id="name" v-model="setting.name">
            <Message :error="message.name?.error" />
        </div>

        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" :disabled="isLoading || isChange">保存</button>
        </div>
    </form>

    <Toast v-if="toasts.length"
        :toasts="toasts"
        @removeToast="removeToast"
    />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading';
import { useToast } from '@/composables/useToast';
import { useAuthUser } from '@/composables/useAuthUser';
import Toast from '@/components/Toast.vue';
import Message from '@/components/Message.vue';

const { isLoading, startLoading, stopLoading } = useLoading();
const { toasts, addToast, removeToast } = useToast();
const { authUser, fetchAuthUser } = useAuthUser();
const message = ref({});

const settingRestore = () => ({
    name: '',
});
const setting = ref(settingRestore());

onMounted(() => {
    setting.value.name = authUser.value.name;
});

const isChange = computed(() => {
    return authUser.value.name === setting.value.name;
});

const Validate = ({
    run() {
        return ([
            this.name(),
        ]).every(Boolean);
    },
    name() {
        message.value.name = {};
        if (!setting.value.name) {
            message.value.name.error = '名前を入力してください。';
        }
        return !message.value.name?.error;
    },
});

const save = async () => {
    message.value = {};
    if (!Validate.run()) {
        addToast('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        await api.put(`/api/auth/me`, setting.value);
        addToast('名前を更新しました。', 'success');
        await fetchAuthUser();
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>