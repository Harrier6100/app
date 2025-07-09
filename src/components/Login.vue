<template>
    <teleport to="body">
        <div v-if="props.isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="$emit('close')">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" @click="$emit('close')"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="login" autocomplete="off">
                                <div class="mb-3">
                                    <label class="form-label" for="code">アカウント</label>
                                    <input class="form-control" type="text" id="code" v-model="credentials.code">
                                    <Message :error="errorMessage.code" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="password">パスワード</label>
                                    <input class="form-control" type="password" id="password" v-model="credentials.password">
                                    <Message :error="errorMessage.password" />
                                </div>
                                <div class="d-grid">
                                    <button class="btn btn-primary">ログイン</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useMessage } from '@/composables/useMessage';
import Message from '@/components/Message.vue';

const { authLogin } = useAuth();
const { errorMessage } = useMessage();

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);
const credentialsRestore = () => ({
    code: '',
    password: '',
});
const credentials = ref(credentialsRestore());

const validate = () => {
    let isValid = true;

    errorMessage.value.code = '';
    if (!credentials.value.code) {
        errorMessage.value.code = 'アカウントを入力してください。';
        isValid = false;
    }

    errorMessage.value.password = '';
    if (!credentials.value.password) {
        errorMessage.value.password = 'パスワードを入力してください。';
        isValid = false;
    }

    return isValid;
};

const login = async () => {
    if (!validate()) return;

    try {
        await authLogin(credentials.value);
        emit('close');
    } catch (error) {
    } finally {
    }
};
</script>