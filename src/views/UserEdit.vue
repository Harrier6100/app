<template>
    <div class="container-fluid">
        <h6>アカウント</h6>
        <form @submit.prevent="save" autocomplete="off">
            <div class="mb-3">
                <label class="form-label" for="id">アカウント</label>
                <input class="form-control" type="text" id="id" v-model="user.id">
                <Message :error="message.id?.error" />
            </div>
            <div class="mb-3">
                <label class="form-label" for="name">名前</label>
                <input class="form-control" type="text" id="name" v-model="user.name">
                <Message :error="message.name?.error" />
            </div>
            <div class="mb-3">
                <label class="form-label" for="email">メールアドレス</label>
                <input class="form-control" type="text" id="email" v-model="user.email">
            </div>
            <div class="mb-3">
                <label class="form-label" for="role">役割</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="radioAdmin" value="admin" v-model="user.role">
                    <label class="form-check-label" for="radioAdmin">Admin</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="radioUser" value="user" v-model="user.role">
                    <label class="form-check-label" for="radioUser">User</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="radioGuest" value="guest" v-model="user.role">
                    <label class="form-check-label" for="radioGuest">Guest</label>
                </div>
            </div>
            <div class="mb-3" v-if="user.role === 'guest'">
                <label class="form-label" for="expiryDate">有効期限</label>
                <Flatpickr class="form-control" id="expiryDate" v-model="user.expiryDate" placeholder="YYYY-MM-DD" />
                <Message :error="message.expiryDate?.error" />
            </div>
            <div class="d-flex justify-content-end gap-3">
                <button class="btn btn-secondary" type="button" @click="back" :disabled="isLoading">戻る</button>
                <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
            </div>
        </form>
    </div>
    <Alert :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '@/composables/useLoading';
import { useAlert } from '@/composables/useAlert';
import { formatDate } from '@/utils/formatDateTime';
import api from '@/services/api';
import Message from '@/components/Message';
import Alert from '@/components/Alert';
import Flatpickr from '@/components/Flatpickr';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { alerts, addAlert, removeAlert } = useAlert();
const message = ref({});
const { id } = route.params;
const userRestore = () => ({
    id: '',
    name: '',
    email: '',
    role: 'user',
    expiryDate: null,
});
const user = ref(userRestore());

onMounted(() => {
    if (id) {
        fetchUser(id);
    }
});

watch(() => user.value.role, (newValue) => {
    if (newValue !== 'guest') {
        user.value.expiryDate = null;
    }
});

const fetchUser = async (id) => {
    try {
        startLoading();
        const response = await api.get(`/api/users/${id}`);
        user.value.id = response.data.id;
        user.value.name = response.data.name;
        user.value.email = response.data.email;
        user.value.role = response.data.role;
        user.value.expiryDate = formatDate(response.data.expiryDate);
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const Validate = {
    run() {
        return ([
            this.id(),
            this.name(),
            this.expiryDate(),
        ]).every(Boolean);
    },
    id() {
        if (!user.value.id) {
            message.value.id = { error: 'アカウントを入力してください。' };
        }
        return !message.value.id?.error;
    },
    name() {
        if (!user.value.name) {
            message.value.name = { error: '名前を入力してください。' };
        }
        return !message.value.name?.error;
    },
    expiryDate() {
        if (user.value.role === 'guest' && !user.value.expiryDate) {
            message.value.expiryDate = { error: 'ゲストアカウントは有効期限が必須です。' };
        }
        return !message.value.expiryDate?.error;
    },
};

const save = async () => {
    message.value = {};
    if (!Validate.run()) {
        addAlert('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        if (id) {
            await api.put(`/api/users/${id}`, user.value);
            addAlert('アカウントを更新しました。', 'success');
        } else {
            await api.post(`/api/users`, user.value);
            addAlert('アカウントを作成しました。', 'success');
            user.value = userRestore();
        }
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const back = () => {
    router.push({
        name: 'UserList',
        query: window.history.state?.routeQuery,
    });
};
</script>