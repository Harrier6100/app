<template>
    <div class="container">

        <div class="mb-3">
            <router-link to="/setting/profile">
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
                            <label class="col-sm-5 col-md-4 col-form-label" for="email">メールアドレス</label>
                            <div class="col-sm-7 col-md-8">
                                <input class="form-control" type="text" id="email" v-model="setting.email">
                                <Message :error="errorMessage.email" />
                            </div>
                        </div>
                    </div>

                    <div class="d-grid col-6 mx-auto">
                        <button class="btn btn-primary" :disabled="isLoading || isChange">
                            <span v-if="isAsync" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
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
import { useMessage } from '@/composables/useMessage';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';

const { user, fetchUser } = useUser();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isAsync, execute } = useAsync();
const { addToast } = useToast();
const { errorMessage } = useMessage();

const setting = ref({
    email: '',
});

const isChange = computed(() => {
    return setting.value.email === user.value.email;
});

const save = async () => {
    try {
        startLoading();
        await execute(async () => {
            await api.put(`/api/auth/me/email`, setting.value);
        });
        await fetchUser();
        addToast('保存しました。', 'success');
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};

onMounted(() => {
    setting.value.email = user.value.email;
});
</script>