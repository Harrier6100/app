<template>
    <button type="button" class="btn btn-primary position-relative">
        <i class="bi bi-bell"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
    </button>
    <button class="btn btn-primary">
        <i class="bi bi-gear"></i>
    </button>
    <button class="btn btn-primary">
        <i class="bi bi-person-circle"></i>
    </button>
    <button class="btn btn-primary" @click="signinModal.open">
        <i class="bi bi-person-circle"></i>
    </button>
    <Signin :isOpen="signinModal.isOpen.value"
        @close="signinModal.close"
    />
</template>

<script setup>
import { useModal } from '@/composables/useModal';
import Signin from '@/components/Signin.vue';

const signinModal = useModal();
</script>