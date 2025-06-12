<template>
    <div class="mb-3">
        <router-link class="text-decoration-none text-dark" to="/setting">
            <i class="bi bi-arrow-left me-2"></i>設定
        </router-link>
    </div>

    <form @submit.prevent="save" autocomplete="off">
        <div class="mb-3">
            <label class="form-label" for="password">パスワード</label>
            <input class="form-control" type="password" id="password" v-model="setting.password">
            <Message :error="message.password?.error" />
        </div>

        <div class="mb-3">
            <label class="form-label" for="passwordConfirm">パスワード（再入力）</label>
            <input class="form-control" type="password" id="passwordConfirm" v-model="setting.passwordConfirm">
            <Message :error="message.passwordConfirm?.error" />
        </div>

        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" :disabled="isLoading">保存</button>
        </div>
    </form>

    <Toast v-if="toasts.length"
        :toasts="toasts"
        @removeToast="removeToast"
    />
</template>

<script setup>
import { ref } from 'vue';
import { api } from '@/services/api';
import { useLoading } from '@/composables/useLoading';
import { useToast } from '@/composables/useToast';
import Toast from '@/components/Toast.vue';
import Message from '@/components/Message.vue';

const { isLoading, startLoading, stopLoading } = useLoading();
const { toasts, addToast, removeToast } = useToast();
const message = ref({});

const settingRestore = () => ({
    password: '',
    passwordConfirm: '',
});
const setting = ref(settingRestore());

const Validate = ({
    run() {
        return ([
            this.password(),
            this.passwordConfirm(),
        ]).every(Boolean);
    },
    password() {
        message.value.password = {};
        if (!setting.value.password) {
            message.value.password.error = 'パスワードを入力してください。';
        }
        return !message.value.password?.error;
    },
    passwordConfirm() {
        message.value.passwordConfirm = {};
        if (!setting.value.passwordConfirm) {
            message.value.passwordConfirm.error = 'パスワード（再入力）を入力してください。';
        } else if (setting.value.password !== setting.value.passwordConfirm) {
            message.value.passwordConfirm.error = 'パスワードとパスワード（再入力）が一致しません。';
        }
        return !message.value.passwordConfirm?.error;
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
        await api.put(`/api/auth/me/password`, setting.value);
        addToast('パスワードを変更しました。', 'success');
        setting.value = settingRestore();
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>