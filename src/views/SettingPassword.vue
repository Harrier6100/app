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
            <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
        </div>
    </form>

    <Alert v-if="alerts.length"
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useMessage } from '@/composables/useMessage';
import { useAlert } from '@/composables/useAlert';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';
import Alert from '@/components/Alert.vue';

const { isLoading, startLoading, stopLoading } = useLoading();
const { message, clearMessage } = useMessage();
const { alerts, addAlert, removeAlert } = useAlert();

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
        return !message.value.password.error;
    },
    passwordConfirm() {
        message.value.passwordConfirm = {};
        if (!setting.value.passwordConfirm) {
            message.value.passwordConfirm.error = 'パスワード（再入力）を入力してください。';
        } else if (setting.value.password !== setting.value.passwordConfirm) {
            message.value.passwordConfirm.error = 'パスワードとパスワード（再入力）が一致しません。';
        }
        return !message.value.passwordConfirm.error;
    },
});

const save = async () => {
    clearMessage();
    if (!Validate.run()) {
        addAlert('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        await api.put(`/api/auth/me/password`, setting.value);
        addAlert('パスワードを変更しました。', 'success');
        setting.value = settingRestore();
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>