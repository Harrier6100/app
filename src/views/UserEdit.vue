<template>
    <div class="container">

        <h6 class="mb-3">アカウント</h6>

        <form @submit.prevent="save" autocomplete="off">

            <div class="row mb-3">
                <label class="col-3 col-form-label" for="code">アカウント</label>
                <div class="col-9">
                    <input class="form-control" type="text" id="code" v-model="user.code">
                    <Message :error="errorMessage.code" />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-3 col-form-label" for="name">名前</label>
                <div class="col-9">
                    <input class="form-control" type="text" id="name" v-model="user.name">
                    <Message :error="errorMessage.name" />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-3 col-form-label">権限</label>
                <div class="col-9">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="admin" value="admin" v-model="user.role">
                        <label class="form-check-label" for="admin">Admin</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="user" value="user" v-model="user.role">
                        <label class="form-check-label" for="user">User</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="guest" value="guest" v-model="user.role">
                        <label class="form-check-label" for="guest">Guest</label>
                    </div>
                </div>
            </div>

            <div class="row mb-3" v-if="user.role === 'user'">
                <div class="col-9 offset-3">
                    <button class="btn btn-link text-decoration-none ps-0" type="button" @click="permission.open">アクセス権限を設定</button>
                </div>
            </div>

            <div class="row mb-3" v-if="user.role === 'guest'">
                <label class="col-3 col-form-label" for="expiryDate">有効期限</label>
                <div class="col-9">
                    <DatePicker class="form-control" id="expiryDate" v-model="user.expiryDate" placeholder="YYYY-MM-DD" />
                    <Message :error="errorMessage.expiryDate" />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-3 col-form-label">備考</label>
                <div class="col-9">
                    <textarea class="form-control" v-model="user.remarks"></textarea>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-9 offset-3">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="isActive" v-model="user.isActive">
                        <label class="form-check-label" for="isActive">{{ user.isActive ? '有効なアカウント' : '無効なアカウント' }}</label>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-end gap-3">
                <button class="btn btn-secondary" type="button" @click="cancel" :disabled="isLoading">キャンセル</button>
                <button class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isAsync" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
                </button>
            </div>

        </form>

    </div>

    <Permission
        v-if="permission.isOpen.value"
        :isOpen="permission.isOpen.value"
        :modelValue="user.permissions"
        @save="user.permissions = $event"
        @close="permission.close"
    />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRouterState } from '@/composables/useRouterState';
import { useLoading } from '@/composables/useLoading';
import { useAsync } from '@/composables/useAsync';
import { useToast } from '@/composables/useToast';
import { useMessage } from '@/composables/useMessage';
import { useToggle } from '@/composables/useToggle';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';
import DatePicker from '@/components/DatePicker.vue';
import Permission from '@/components/modals/Permission.vue';

const route = useRoute();
const router = useRouter();
const routerState = useRouterState();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isAsync, execute } = useAsync();
const { addToast } = useToast();
const { errorMessage } = useMessage();
const permission = useToggle();

const { code } = route.params;
const userRestore = () => ({
    code: '',
    name: '',
    role: 'user',
    permissions: [],
    expiryDate: '',
    remarks: '',
    isActive: true,
});
const user = ref(userRestore());

const validate = () => {
    let isValid = true;

    errorMessage.value.code = '';
    if (!user.value.code) {
        errorMessage.value.code = 'アカウントを入力してください。';
        isValid = false;
    }

    errorMessage.value.name = '';
    if (!user.value.name) {
        errorMessage.value.name = '名前を入力してください。';
        isValid = false;
    }

    errorMessage.value.expiryDate = '';
    if (user.value.role === 'guest' && !user.value.expiryDate) {
        errorMessage.value.expiryDate = '有効期限を設定してください。';
        isValid = false;
    }

    return isValid;
};

const save = async () => {
    if (!validate()) {
        addToast('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        if (code) {
            await execute(async () => {
                await api.put(`/api/users/${code}`, user.value);
            });
        } else {
            await execute(async () => {
                await api.post(`/api/users`, user.value);
            });
            user.value = userRestore();
        }
        addToast('保存しました。', 'success');
    } catch (error) {
        addToast(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const cancel = () => {
    router.push({
        name: 'UserList',
        query: routerState.routeQuery.value ?? {},
    });
};

watch(() => user.value.role, (newVal) => {
    if (newVal !== 'guest') {
        user.value.expiryDate = '';
    }
});

onMounted(async () => {
    if (code) {
        try {
            startLoading();
            const response = await api.get(`/api/users/${code}`);
            user.value = { ...user.value, ...response.data };
        } catch (error) {
            addToast(error.message, 'error');
        } finally {
            stopLoading();
        }
    }
});
</script>