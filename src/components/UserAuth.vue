<template>
    <template v-if="isAuth">
        <div class="d-flex">

            <button class="btn btn-primary">
                <div class="position-relative">
                    <i class="bi bi-bell"></i>
                    <span class="badge rounded-pill position-absolute top-0 start-100 translate-middle bg-danger"></span>
                </div>
            </button>

            <router-link class="text-white" to="/setting">
                <button class="btn btn-primary">
                    <i class="bi bi-gear"></i>
                </button>
            </router-link>

            <button class="btn btn-primary" @click="logout">
                <i class="bi bi-person-circle me-1"></i>{{ name }}
            </button>

        </div>
    </template>
    <template v-else>
        <button class="btn btn-primary" @click="login.open">ログイン</button>
    </template>

    <Login v-if="login.isOpen.value"
        :isOpen="login.isOpen.value"
        @close="login.close"
    />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUser } from '@/composables/useUser';
import { useConfirm } from '@/composables/useConfirm';
import { useToast } from '@/composables/useToast';
import { useToggle } from '@/composables/useToggle';
import Login from '@/components/modals/Login.vue';

const router = useRouter();
const { isAuth, authLogout } = useAuth();
const { name } = useUser();
const { confirm } = useConfirm();
const { addToast } = useToast();
const login = useToggle();

const logout = async () => {
    const isConfirm = await confirm('ログアウトしますか？');
    if (!isConfirm) return;

    await authLogout();
    addToast('ログアウトしました。', 'success');

    router.push('/');
};
</script>