<template>
    <div v-if="props.isOpen">
        <div class="modal-backdrop show"></div>
        <div class="modal show d-block" tabindex="-1" @click.self="close">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="mb-3">
                            <div class="d-flex justify-content-end">
                                <button class="btn-close" @click="close"></button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <form @submit.prevent="signin" autocomplete="off">
                                <div class="mb-3">
                                    <input class="form-control" type="text" v-model="credential.id" @input="Validate.id()" placeholder="アカウント">
                                    <Message :message="message.id" />
                                </div>
                                <div class="mb-3">
                                    <input class="form-control" type="password" v-model="credential.password" @input="Validate.password()" placeholder="パスワード">
                                    <Message :message="message.password" />
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-primary" type="submit" :disabled="isLoading">サインイン</button>
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
import { ref, defineProps, defineEmits } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoading } from '@/composables/useLoading';
import Message from '@/components/Message';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);
const auth = useAuthStore();
const { isLoading, startLoading, stopLoading } = useLoading();
const credentialRestore = () => ({
    id: '',
    password: '',
});
const credential = ref(credentialRestore());
const message = ref({});

const Validate = {
    run() {
        return ([
            this.id(),
            this.password(),
        ]).every(Boolean);
    },
    id() {
        message.value.id = {};
        if (!credential.value.id) {
            message.value.id.error = 'アカウントを入力してください。';
        }
        return !message.value.id?.error;
    },
    password() {
        message.value.password = {};
        if (!credential.value.password) {
            message.value.password.error = 'パスワードを入力してください。';
        }
        return !message.value.password?.error;
    },
};

const signin = async () => {
    message.value = {};
    if (!Validate.run()) return;

    try {
        startLoading();
        await auth.signin(credential.value);
        close();
    } catch (error) {
        message.value.form = { error: error.message };
    } finally {
        stopLoading();
    }
};

const close = () => {
    credential.value = credentialRestore();
    message.value = {};
    emit('close');
};
</script>