<template>
    <div v-if="props.isOpen">
        <div class="modal-backdrop show"></div>
        <div class="modal show d-block" @click.self="close">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="d-flex justify-content-end">
                            <button class="btn-close" type="button" @click="close"></button>
                        </div>
                        <form @submit.prevent="signin" autocomplete="off">
                            <div class="mb-3">
                                <label class="form-label" for="id">アカウント</label>
                                <input class="form-control" type="text" id="id" v-model="credentials.id">
                                <Message :error="message.id?.error" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="password">パスワード</label>
                                <input class="form-control" type="password" id="password" v-model="credentials.password">
                                <Message :error="message.password?.error" />
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-primary" type="submit" :disables="isLoading">サインイン</button>
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
const message = ref({});
const credentialsRestore = () => ({
    id: '',
    password: '',
});
const credentials = ref(credentialsRestore());

const Validate = {
    run() {
        return ([
            this.id(),
            this.password(),
        ]).every(Boolean);
    },
    id() {
        if (!credentials.value.id) {
            message.value.id = { error: 'アカウントを入力してください。' };
        }
        return !message.value.id?.error;
    },
    password() {
        if (!credentials.value.password) {
            message.value.password = { error: 'パスワードを入力してください。' };
        }
        return !message.value.password?.error;
    },
};

const signin = async () => {
    message.value = {};
    if (!Validate.run()) {
        message.value.app = { error: '入力内容に誤りがあります。' };
        return;
    }

    try {
        startLoading();
        await auth.signin(credentials.value);
        close();
    } catch (error) {
        message.value.app = { error: error.message };
    } finally {
        stopLoading();
    }
};

const close = () => {
    credentials.value = credentialsRestore();
    message.value = {};
    emit('close');
};
</script>

<style scoped>
.modal-backdrop {
    z-index: 1040;
}

.modal {
    z-index: 1050;
}
</style>