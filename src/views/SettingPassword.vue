<template>
    <div class="container">
        <h6 class="mb-3">設定</h6>

        <div class="mb-3">
            <router-link class="text-dark text-decoration-none" to="/setting">
                <i class="bi bi-chevron-left"></i>
            </router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
                <form @submit.prevent="handleSubmit" autocomplete="off">

                    <div class="row mb-3">
                        <label class="col-3 col-form-label" for="password">新しいパスワード</label>
                        <div class="col-9">
                            <input class="form-control" type="password" id="password" v-model="form.password">
                            <Message :error="errors.password" />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-3 col-form-label" for="passwordConfirm">新しいパスワード確認</label>
                        <div class="col-9">
                            <input class="form-control" type="password" id="passwordConfirm" v-model="form.passwordConfirm">
                            <Message :error="errors.passwordConfirm" />
                        </div>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit" :disabled="isLoading">
                            <span v-if="isSpinning" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
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
import { api } from '@/libs/api';
import Message from '@/components/Message.vue';

const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useAsync();
const { addToast } = useToast();
const errors = ref({});
const formRestore = () => ({
    password: '',
    passwordConfirm: '',
});
const form = ref(formRestore());

const validate = () => {
    let isValid = true;

    errors.value.password = '';
    if (!form.value.password) {
        errors.value.password = '新しいパスワードを入力してください。';
        isValid = false;
    }

    errors.value.passwordConfirm = '';
    if (!form.value.passwordConfirm) {
        errors.value.passwordConfirm = '新しいパスワード確認を入力してください。';
        isValid = false;
    } else {
        if (form.value.password !== form.value.passwordConfirm) {
            errors.value.passwordConfirm = '新しいパスワードが一致しません。';
            isValid = false;
        }
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validate()) return;

    try {
        startLoading();
        await execute(async () => {
            await api.put(`/api/auth/me/password`, form.value);
        });
        addToast('保存しました。', 'success');
        form.value = formRestore();
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>