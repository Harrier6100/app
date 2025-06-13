<template>
    <template v-if="isAuth">
        <div class="text-white ms-3" role="button">
            <div class="position-relative">
                <i class="bi bi-bell"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
            </div>
        </div>
        <router-link class="text-white ms-3" to="/setting">
            <i class="bi bi-gear"></i>
        </router-link>
        <div class="text-white ms-3" role="button" @click="logout">
            <i class="bi bi-person-circle me-1"></i>{{ authUserName }}
        </div>
    </template>
     <template v-if="!isAuth">
        <div class="text-white ms-3" role="button" @click="openLogin">
            <i class="bi bi-person-circle me-1"></i>ログイン
        </div>
    </template>
    <Login :isOpen="isOpenLogin"
        @close="closeLogin"
    />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useConfirm } from '@/composables/useConfirm';
import { useModal } from '@/composables/useModal';
import { useAuth } from '@/composables/useAuth';
import { useAuthUser } from '@/composables/useAuthUser';
import Login from '@/components/Login.vue';

const router = useRouter();
const { confirm } = useConfirm();
const { isOpen: isOpenLogin, open: openLogin, close: closeLogin } = useModal();
const { isAuth, authLogout } = useAuth();
const { authUserName } = useAuthUser();

const logout = async () => {
    const confirmed = await confirm('ログアウトしますか？');
    if (!confirmed) return;

    await authLogout();
    router.push('/');
};
</script>