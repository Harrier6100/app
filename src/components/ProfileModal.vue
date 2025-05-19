<template>
    <div v-if="props.isOpen">
        <div class="modal-backdrop show"></div>
        <div class="modal show d-block" tabindex="-1" @click.self="close">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="mb-3">
                            <div class="d-flex justify-content-end">
                                <button class="btn-close" @click="close"></button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <form @submit.prevent="save" autocomplete="off">
                                <div class="row mb-3">
                                    <label class="col-4 col-form-label" for="name">名前</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" id="name" v-model="profile.name">
                                        <Message :message="message.name" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-4 col-form-label" for="email">メールアドレス</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" id="email" v-model="profile.email">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-4 col-form-label" for="password">パスワード</label>
                                    <div class="col-8">
                                        <div class="mb-2">
                                            <input class="form-control" type="password" id="password" v-model="profile.password" placeholder="新しいパスワード">
                                            <Message :message="message.password" />
                                        </div>
                                        <div class="mb-2">
                                            <input class="form-control" type="password" id="passwordConfirm" v-model="profile.passwordConfirm" placeholder="新しいパスワード（再入力）">
                                            <Message :message="message.passwordConfirm" />
                                        </div>
                                        <div class="d-flex">
                                            <button class="btn btn-primary" type="button" @click="change" :disabled="isLoading">パスワード変更</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
                                </div>
                            </form>
                        </div>
                        <div class="mb-3">
                            <Message :message="message.form" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useLoading } from '@/composables/useLoading';
import api from '@/services/api';
import Message from '@/components/Message';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);
const userStore = useUserStore();
const { isLoading, startLoading, stopLoading } = useLoading();
const profileRestore = () => ({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
});
const profile = ref(profileRestore());
const message = ref({});

watch(() => props.isOpen, async (isOpen) => {
    if (isOpen) {
        try {
            startLoading();
            await userStore.fetchUser();
            profile.value.name = userStore.user.name;
            profile.value.email = userStore.user.email;
        } catch (error) {
            message.value.form = { error: error.message };
        } finally {
            stopLoading();
        }
    }
});

const Validate = {
    save() {
        return ([
            this.name(),
        ]).every(Boolean);
    },
    change() {
        return ([
            this.password(),
            this.passwordConfirm(),
        ]).every(Boolean);
    },
    name() {
        message.value.name = {};
        if (!profile.value.name) {
            message.value.name.error = '名前を入力してください。';
        }
        return !message.value.name?.error;
    },
    password() {
        message.value.password = {};
        if (!profile.value.password) {
            message.value.password.error = '新しいパスワードを入力してください。';
        }
        return !message.value.password?.error;
    },
    passwordConfirm() {
        message.value.passwordConfirm = {};
        if (!profile.value.passwordConfirm) {
            message.value.passwordConfirm.error = '新しいパスワード（再入力）を入力してください。';
        } else {
            if (profile.value.password !== profile.value.passwordConfirm) {
                message.value.passwordConfirm.error = '入力されたパスワードが一致しません。';
            }
        }
        return !message.value.passwordConfirm?.error;
    },
};

const save = async () => {
    message.value = {};
    if (!Validate.save()) return;

    try {
        startLoading();
        await api.put('/api/profile', profile.value);
        await userStore.fetchUser();
        message.value.form = { success: 'プロファイルを変更しました。' };
    } catch (error) {
        message.value.form = { error: error.message };
    } finally {
        stopLoading();
    }
};

const change = async () => {
    message.value = {};
    if (!Validate.change()) return;

    try {
        startLoading();
        await api.put('/api/profile/password', profile.value);
        profile.value.password = '';
        profile.value.passwordConfirm = '';
        message.value.form = { success: 'パスワードを変更しました。' };
    } catch (error) {
        message.value.form = { error: error.message };
    } finally {
        stopLoading();
    }
};

const close = () => {
    message.value = {};
    emit('close');
};
</script>