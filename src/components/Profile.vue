<template>
    <div v-if="props.isOpen">
        <div class="modal-backdrop show"></div>
        <div class="modal show d-block" @click.self="close">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="d-flex justify-content-end">
                            <button class="btn-close" @click="close"></button>
                        </div>
                        <form @submit.prevent="save" autocomplete="off">
                            <div class="mb-3">
                                <label class="form-label" for="name">名前</label>
                                <input class="form-control" type="text" id="name" v-model="profile.name">
                                <Message :error="message.name?.error" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="email">メールアドレス</label>
                                <input class="form-control" type="text" id="email" v-model="profile.email">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="password">パスワード</label>
                                <div class="mb-2">
                                    <input class="form-control" type="password" id="password" v-model="profile.password" placeholder="新しいパスワード">
                                    <Message :error="message.password?.error" />
                                </div>
                                <div class="mb-2">
                                    <input class="form-control" type="password" id="passwordConfirm" v-model="profile.passwordConfirm" placeholder="新しいパスワード（再入力）">
                                    <Message :error="message.passwordConfirm?.error" />
                                </div>
                                <button class="btn btn-primary" type="button" @click="change" :disabled="isLoading">パスワード変更</button>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
                            </div>
                        </form>
                        <Message :error="message.app?.error" />
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
const user = useUserStore();
const { isLoading, startLoading, stopLoading } = useLoading();
const message = ref({});
const profileRestore = () => ({
    name: '',
    email: '',
});
const profile = ref(profileRestore());

watch(() => props.isOpen, async (isOpen) => {
    if (isOpen) {
        try {
            startLoading();
            await user.fetchUser();
            profile.value.name = user.user.name;
            profile.value.email = user.user.email;
        } catch (error) {
            message.value.app = { error: error.message };
        } finally {
            stopLoading();
        }
    }
});

const Validate = {
    run() {
        return ([
            this.name(),        
        ]).every(Boolean);
    },
    name() {
        if (!profile.value.name) {
            message.value.name = { error: '名前を入力してください。' };
        }
        return !message.value.name?.error;
    },
    change() {
        return ([
            this.password(),
            this.passwordConfirm(),
        ]).every(Boolean);
    },
    password() {
        if (!profile.value.password) {
            message.value.password = { error: 'パスワードを入力してください。' };
        }
        return !message.value.password?.error;
    },
    passwordConfirm() {
        if (!profile.value.passwordConfirm) {
            message.value.passwordConfirm = { error: 'パスワード（再入力）を入力してください。' };
        } else {
            if (profile.value.password !== profile.value.passwordConfirm) {
                message.value.passwordConfirm = { error: '入力されたパスワードが一致しません。' };
            }
        }
        return !message.value.passwordConfirm?.error;
    },
};

const save = async () => {
    message.value = {};
    if (!Validate.run()) {
        message.value.app = { error: '入力内容に誤りがあります。' };
        return;
    }

    try {
        startLoading();
        await api.put('/api/profile', profile.value);
        await user.fetchUser();
    } catch (error) {
        message.value.app = { error: error.message };
    } finally {
        stopLoading();
    }
};

const change = async () => {
    message.value = {};
    if (!Validate.change()) {
        message.value.app = { error: '入力内容に誤りがあります。' };
        return;
    }

    try {
        startLoading();
        await api.put('/api/profile/password', profile.value);
        profile.value.password = '';
        profile.value.passwordConfirm = '';
    } catch (error) {
        message.value.app = { error: error.message };
    } finally {
        stopLoading();
    }
};

const close = () => {
    message.value = {};
    emit('close');
};
</script>