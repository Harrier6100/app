<template>
    <div class="container-fluid">
        <div class="mb-3">
            <h6>アカウント</h6>
        </div>
        <div class="mb-3">
            <form @submit.prevent="save" autocomplete="off">
                <div class="mb-3">
                    <label class="form-label" for="id">アカウント</label>
                    <input type="text" class="form-control" id="id" v-model="user.id">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="name">名前</label>
                    <input type="text" class="form-control" id="name" v-model="user.name">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="email">メールアドレス</label>
                    <input type="text" class="form-control" id="email" v-model="user.email">
                </div>
                <div class="mb-3">
                    <label class="form-label">役割</label>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="admin" name="role" value="admin" v-model="user.role">
                        <label class="form-check-label" for="admin">Admin</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="user" name="role" value="user" v-model="user.role">
                        <label class="form-check-label" for="user">User</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="guest" name="role" value="guest" v-model="user.role">
                        <label class="form-check-label" for="guest">Guest</label>
                    </div>
                </div>
                <div class="mb-3" v-if="user.role === 'guest'">
                    <label class="form-label" for="expiryDate">有効期限</label>
                    <Flatpickr class="form-control" id="expiryDate" v-model="user.expiryDate" placeholder="YYYY-MM-DD" />
                </div>
                <div class="d-flex justify-content-end gap-3">
                    <button type="button" class="btn btn-secondary" @click="back" :disabled="isLoading">戻る</button>
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">保存</button>
                </div>
            </form>
        </div>
    </div>
    <Alert v-if="alerts.length"
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '@/composables/useLoading';
import { useAlert } from '@/composables/useAlert';
import api from '@/services/api';
import Alert from '@/components/Alert';
import Flatpickr from '@/components/Flatpickr';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { alerts, addAlert, removeAlert } = useAlert();

const { id } = route.params;
const userRestore = () => ({
    id: '',
    name: '',
    email: '',
    role: 'user',
    expiryDate: null,
});
const user = ref(userRestore());
const message = ref({});

onMounted(() => {
    if (id) {
        fetchUser(id);
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
        user.value.expiryDate = response.data.expiryDate;
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const Validate = {
    save() {
        return ([
            this.id(),
            this.name(),
            this.expiryDate(),
        ]).every(Boolean);
    },
    id() {
        message.value.id = {};
        if (!user.value.id) {
            message.value.id.error = 'アカウントを入力してください。';
        }
        return !message.value.id.error;
    },
    name() {
        message.value.name = {};
        if (!user.value.name) {
            message.value.name.error = '名前を入力してください。';
        }
        return !message.value.name.error;
    },
    expiryDate() {
        message.value.expiryDate = {};
        if (user.value.role === 'guest' && !user.value.expiryDate) {
            message.value.expiryDate.error = 'ゲストアカウントは有効期限が必須です。';
        }
        return !message.value.expiryDate.error;
    },
};

const save  = async () => {
    message.value = {};
    if (!Validate.save()) return;

    try {
        startLoading();
        if (id) {
            await api.put(`/api/users/${id}`, user.value);
            addAlert('アカウントを更新しました。', 'success');
        } else {
            await api.post('/api/users', user.value);
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