<template>
    <template v-if="isAuth">
        <div class="d-flex">
            <button class="btn btn-primary" @click="logout">
                <i class="bi bi-person-circle me-1"></i>{{ userName }}
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
import { useToggle } from '@/composables/useToggle';
import Login from '@/components/Login.vue';

const router = useRouter();
const { isAuth, authLogout } = useAuth();
const { userName } = useUser();
const login = useToggle();

const logout = async () => {
    await authLogout();
    router.push('/');
};
</script>