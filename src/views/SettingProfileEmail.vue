<template>
    <div class="container">
        <h6 class="mb-3">設定</h6>

        <div class="mb-3">
            <router-link class="text-dark text-decoration-none" to="/setting/profile">
                <i class="bi bi-chevron-left"></i>
            </router-link>
        </div>

        <div class="row">
            <div class="col">
                <form @submit.prevent="handleSubmit" autocomplete="off">

                    <div class="row mb-3">
                        <label class="col-3 col-form-label" for="email">メールアドレス</label>
                        <div class="col-9">
                            <input class="form-control" type="text" id="email" v-model="form.email">
                            <Message :error="errors.email" />
                        </div>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit" :disabled="isLoading || isChange">
                            <span v-if="isSpinning" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
                        </button>
                    </div>

                </form>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUser } from '@/composables/useUser';
import { useLoading } from '@/composables/useLoading';
import { useAsync } from '@/composables/useAsync';
import { useToast } from '@/composables/useToast';
import { api } from '@/libs/api';
import Message from '@/components/Message.vue';

const { user, fetchUser } = useUser();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useAsync();
const { addToast } = useToast();
const errors = ref({});
const formRestore = () => ({
    email: '',
});
const form = ref(formRestore());

onMounted(async () => {
    form.value.email = user.value.email;
});

const isChange = computed(() => {
    return form.value.email === user.value.email;
});

const handleSubmit = async () => {
    try {
        startLoading();
        await execute(async () => {
            await api.put(`/api/auth/me/email`, form.value);
        });
        addToast('保存しました。', 'success');
        await fetchUser();
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};
</script>