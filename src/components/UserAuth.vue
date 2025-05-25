<template>
    <ul class="navbar-nav">
        <li class="nav-item dropdown" v-if="user.user">
            <a class="nav-link dropdown-toggle" id="user" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle me-1"></i>{{ user.userName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="user">
                <li><a class="dropdown-item" role="button" @click="profile.open">設定</a></li>
                <li><a class="dropdown-item" role="button" @click="signout">サインアウト</a></li>
            </ul>
        </li>
        <li class="nav-item" v-if="!user.user">
            <button class="btn btn-primary" type="button" @click="signin.open">サインイン</button>
        </li>
    </ul>
    <Signin :isOpen="signin.isOpen.value" @close="signin.close" />
    <Profile :isOpen="profile.isOpen.value" @close="profile.close" />
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { useOpenClose } from '@/composables/useOpenClose';
import Signin from '@/components/Signin';
import Profile from '@/components/Profile';

const auth = useAuthStore();
const user = useUserStore();
const signin = useOpenClose();
const profile = useOpenClose();

const signout = () => {
    if (!window.confirm('サインアウトしますか？')) return;
    auth.signout();
};
</script>