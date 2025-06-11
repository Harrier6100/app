<template>
    <template v-if="isAuth">
        <button type="button" class="btn btn-primary position-relative">
            <i class="bi bi-bell"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
        </button>
        <button type="button" class="btn btn-primary">
            <i class="bi bi-gear"></i>
        </button>
        <button type="button" class="btn btn-primary" @click="handleLogout">
            <i class="bi bi-person-circle"></i>
            {{ authUserName }}
        </button>
    </template>
     <template v-if="!isAuth">
        <button type="button" class="btn btn-primary" @click="loginModal.open">
            <i class="bi bi-person-circle"></i>
        </button>
        <Login :isOpen="loginModal.isOpen.value"
            @close="loginModal.close"
        />
    </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useConfirm } from '@/composables/useConfirm';
import { useAuth } from '@/composables/useAuth';
import { useAuthUser } from '@/composables/useAuthUser';
import { useModal } from '@/composables/useModal';
import Login from '@/components/Login.vue';

const router = useRouter();
const { confirm } = useConfirm();
const { isAuth, logout } = useAuth();
const { authUserName } = useAuthUser();
const loginModal = useModal();

const handleLogout = async () => {
    const confirmed = await confirm('ログアウトしますか？');
    if (!confirmed) return;

    logout();
    // router.push({ name: 'Home' });
};
</script>