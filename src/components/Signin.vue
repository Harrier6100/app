<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal show d-block" @click.self="close">
                <div class="modal-dialog">
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

                                <div class="d-grid">
                                    <button class="btn btn-primary" type="submit" @click="signin" :disabled="isLoading">サインイン</button>
                                </div>

                                <Message :error="message.form?.error" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useLoading } from '@/composables/useLoading';
import Message from '@/components/Message.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);
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
        message.value.id = {};
        if (!credentials.value.id) {
            message.value.id.error = 'アカウントを入力してください。';
        }
        return !message.value.id?.error;
    },
    password() {
        message.value.password = {};
        if (!credentials.value.password) {
            message.value.password.error = 'パスワードを入力してください。';
        }
        return !message.value.password?.error;
    },
};

const signin = async () => {
    message.value = { form: {} };
    if (!Validate.run()) return;

    try {
        startLoading();
        close();
    } catch (error) {
        message.value.form.error = error.message;
    } finally {
        stopLoading();
    }
};

const close = () => {
    message.value = {};
    credentials.value = credentialsRestore();
    emit('close');
};
</script>