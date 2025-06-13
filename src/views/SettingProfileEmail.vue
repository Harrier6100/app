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
            <button class="btn btn-primary" type="submit" :disabled="isLoading || isChange">保存</button>
        </div>
    </form>

    <Alert v-if="alerts.length"
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useMessage } from '@/composables/useMessage';
import { useAlert } from '@/composables/useAlert';
import { useAuthUser } from '@/composables/useAuthUser';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';
import Alert from '@/components/Alert.vue';

const { isLoading, startLoading, stopLoading } = useLoading();
const { message, clearMessage } = useMessage();
const { alerts, addAlert, removeAlert } = useAlert();
const { authUser, fetchAuthUser } = useAuthUser();

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
    clearMessage();
    if (!Validate.run()) {
        addAlert('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        await api.put(`/api/auth/me/email`, setting.value);
        addAlert('メールアドレスを更新しました。', 'success');
        await fetchAuthUser();
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>