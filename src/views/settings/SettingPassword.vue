<template>
    <div class="container">

        <div class="mb-3">
            <router-link to="/setting">
                <button class="btn btn-link text-decoration-none text-dark">
                    <div class="d-flex gap-1">
                        <i class="bi bi-arrow-left me-1"></i>
                        <span>戻る</span>
                    </div>
                </button>
            </router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-10 col-xl-8">
                <form @submit.prevent="save" autocomplete="off">

                    <div class="py-3">
                        <div class="row mb-3">
                            <label class="col-sm-5 col-md-4 col-form-label" for="password">新しいパスワード</label>
                            <div class="col-sm-7 col-md-8">
                                <input class="form-control" type="password" id="password" v-model="setting.password">
                                <Message :error="errorMessage.password" />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-5 col-md-4 col-form-label" for="passwordConfirm">新しいパスワード確認</label>
                            <div class="col-sm-7 col-md-8">
                                <input class="form-control" type="password" id="passwordConfirm" v-model="setting.passwordConfirm">
                                <Message :error="errorMessage.passwordConfirm" />
                            </div>
                        </div>
                    </div>

                    <div class="d-grid col-6 mx-auto">
                        <button class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isAsync" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
                        </button>
                    </div>

                </form>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLoading } from '@/composables/useLoading';
import { useAsync } from '@/composables/useAsync';
import { useToast } from '@/composables/useToast';
import { useMessage } from '@/composables/useMessage';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';

const { isLoading, startLoading, stopLoading } = useLoading();
const { isAsync, execute } = useAsync();
const { addToast } = useToast();
const { errorMessage } = useMessage();

const settingRestore = () => ({
    password: '',
    passwordConfirm: '',
});
const setting = ref(settingRestore());

const validate = () => {
    let isValid = true;

    errorMessage.value.password = '';
    if (!setting.value.password) {
        errorMessage.value.password = '新しいパスワードを入力してください。';
        isValid = false;
    }

    errorMessage.value.passwordConfirm = '';
    if (!setting.value.passwordConfirm) {
        errorMessage.value.passwordConfirm = '新しいパスワードを入力してください。';
        isValid = false;
    } else if (setting.value.password !== setting.value.passwordConfirm) {
        errorMessage.value.passwordConfirm = '新しいパスワードが一致しません。';
        isValid = false;
    }

    return isValid;
};

const save = async () => {
    if (!validate()) {
        addToast('エラー項目があります。', 'error');
        return;
    }

    try {
        startLoading();
        await execute(async () => {
            await api.put(`/api/auth/me/password`, setting.value);
        });
        setting.value = settingRestore();
        addToast('パスワードが変更されました。', 'success');
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>