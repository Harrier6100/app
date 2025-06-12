<template>
    <div class="mb-3">
        <router-link to="/setting/profile" class="text-decoration-none text-dark">
            <i class="bi bi-arrow-left me-2"></i>プロフィール
        </router-link>
    </div>

    <form @submit.prevent="save" autocomplete="off">
        <div class="mb-3">
            <label class="form-label" for="email">メールアドレス</label>
            <input class="form-control" type="text" id="email" v-model="setting.email">
            <Message :error="message.email?.error" />
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
    email: '',
});
const setting = ref(settingRestore());

onMounted(() => {
    setting.value.email = authUser.value.email;
});

const isChange = computed(() => {
    return authUser.value.email === setting.value.email;
});

const Validate = ({
    run() {
        return ([
            this.email(),
        ]).every(Boolean);
    },
    email() {
        message.value.email = {};
        if (!setting.value.email) {
            message.value.email.error = 'メールアドレスを入力してください。';
        }
        return !message.value.email?.error;
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
        await api.put(`/api/auth/me/email`, setting.value);
        addToast('メールアドレスを更新しました。', 'success');
        await fetchAuthUser();
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>