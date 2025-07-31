<template>
    <template v-if="isAuth">
        <button class="btn btn-primary" type="button">
            <div class="position-relative">
                <i class="bi bi-bell"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
            </div>
        </button>
        <button class="btn btn-primary" type="button">
            <router-link class="text-white" to="/setting">
                <i class="bi bi-gear"></i>
            </router-link>
        </button>
        <button class="btn btn-primary" type="button" @click="handleLogout">
            <i class="bi bi-person-circle me-1"></i>{{ name }}
        </button>
    </template>
    <template v-else>
        <button class="btn btn-primary" type="button" @click="loginModal.open">ログイン</button>
    </template>

    <LoginModal v-if="loginModal.isOpen.value"
        :isOpen="loginModal.isOpen.value"
        @close="loginModal.close"
    />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUser } from '@/composables/useUser';
import { useConfirm } from '@/composables/useConfirm';
import { useToast } from '@/composables/useToast';
import { useDisclosure } from '@/composables/useDisclosure';
import LoginModal from '@/components/LoginModal.vue';

const router = useRouter();
const { isAuth, authLogout } = useAuth();
const { name } = useUser();
const { confirm } = useConfirm();
const { addToast } = useToast();
const loginModal = useDisclosure();

const handleLogout = async () => {
    const isConfirmed = await confirm('ログアウトしますか？');
    if (!isConfirmed) return;

    try {
        await authLogout();
        router.push('/');
        addToast('ログアウトしました。', 'success');
    } catch (error) {
        addToast('正常にログアウトできませんでした。', 'error');
    }
};
</script>