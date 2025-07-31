<template>
    <teleport to="body">
        <div v-if="isOpen">
            <div class="modal-backdrop show"></div>
            <div class="modal d-block show" @click.self="emit('close')">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn-close" type="button" @click="emit('close')"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="handleSubmit" autocomplete="off">

                                <div class="mb-3">
                                    <input class="form-control" type="text" v-model="credentials.code" placeholder="アカウント">
                                    <Message :error="errors.code" />
                                </div>
                                
                                <div class="mb-3">
                                    <input class="form-control" type="password" v-model="credentials.password" placeholder="パスワード">
                                    <Message :error="errors.password" />
                                </div>

                                <div class="d-grid">
                                    <button class="btn btn-primary" type="submit" :disabled="isLoading">
                                        <span v-if="isSpinning" class="spinner-border spinner-border-sm me-1"></span>ログイン
                                    </button>
                                </div>

                                <Message :error="errors.error" />

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
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useLoading } from '@/composables/useLoading';
import { useAsync } from '@/composables/useAsync';
import Message from '@/components/Message.vue';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const router = useRouter();
const { authLogin } = useAuth();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useAsync();
const errors = ref({});
const credentials = ref({
    code: '',
    password: '',
});

const validate = () => {
    let isValid = true;

    errors.value.code = '';
    if (!credentials.value.code) {
        errors.value.code = 'アカウントを入力してください。';
        isValid = false;
    }

    errors.value.password = '';
    if (!credentials.value.password) {
        errors.value.password = 'パスワードを入力してください。';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validate()) return;

    try {
        startLoading();
        await execute(async () => {
            await authLogin(credentials.value);
        });
        emit('close');

        const redirect = sessionStorage.getItem('redirect');
        if (redirect) {
            sessionStorage.removeItem('redirect');
            router.push(redirect);
        }
    } catch (error) {
        errors.value.error = error.message;
    } finally {
        stopLoading();
    }
};
</script>