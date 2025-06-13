<template>
    <div class="mb-3">アカウント</div>

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
            <label class="form-label" for="role">役割</label>
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

        <div class="mb-3" v-if="user.role === 'guest'">
            <label class="form-label" for="expiryDate">有効期限</label>
            <DatePickr class="form-control" v-model="user.expiryDate" />
            <Message :error="message.expiryDate?.error" />
        </div>

        <div class="mb-3">
            <label class="form-label" for="remarks">備考</label>
            <textarea class="form-control" id="remarks" v-model="user.remarks"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label" for="isActive">状態</label>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="isActive" v-model="user.isActive">
                <label class="form-check-label" for="isActive">
                    {{ user.isActive ? '有効' : '無効' }}
                </label>
            </div>
        </div>

        <div class="d-flex justify-content-end gap-3">
            <button class="btn btn-secondary" type="button" @click="cancel">キャンセル</button>
            <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
        </div>
    </form>

    <Alert v-if="alerts.length"
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '@/composables/useLoading';
import { useMessage } from '@/composables/useMessage';
import { useAlert } from '@/composables/useAlert';
import { api } from '@/services/api';
import { formatDate } from '@/utils/formatDateTime';
import Alert from '@/components/Alert.vue';
import Message from '@/components/Message.vue';
import DatePickr from '@/components/DatePickr.vue';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { message, clearMessage } = useMessage();
const { alerts, addAlert, removeAlert } = useAlert();

const { id } = route.params;
const userRestore = () => ({
    id: '',
    name: '',
    role: 'user',
    expiryDate: null,
    remarks: '',
    isActive: true,
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
        user.value.role = response.data.role;
        user.value.expiryDate = formatDate(response.data.expiryDate);
        user.value.remarks = response.data.remarks;
        user.value.isActive = response.data.isActive;
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

const save = async () => {
    clearMessage();
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

const cancel = () => {
    router.push({
        name: 'UserList',
        query: window.history.state?.routeQuery,
    });
};
</script>