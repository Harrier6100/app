<template>
    <ul class="navbar-nav">
        <li class="nav-item dropdown" v-if="userStore.user">
            <a class="nav-link dropdown-toggle" id="user" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle me-1"></i>{{ userStore.userName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="user">
                <li><a class="dropdown-item" role="button" @click="profileModal.open">設定</a></li>
                <li><a class="dropdown-item" role="button" @click="signout">サインアウト</a></li>
            </ul>
        </li>
        <li class="nav-item" v-if="!userStore.user">
            <button class="btn btn-primary" @click="signinModal.open">サインイン</button>
        </li>
    </ul>
    <SigninModal :isOpen="signinModal.isOpen.value" @close="signinModal.close" />
    <ProfileModal :isOpen="profileModal.isOpen.value" @close="profileModal.close" />
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { useModal } from '@/composables/useModal';
import SigninModal from '@/components/SigninModal';
import ProfileModal from '@/components/ProfileModal';

const authStore = useAuthStore();
const userStore = useUserStore();
const signinModal = useModal();
const profileModal = useModal();

const signout = () => {
    if (!window.confirm('サインアウトしますか？')) return;
    authStore.signout();
};
</script>