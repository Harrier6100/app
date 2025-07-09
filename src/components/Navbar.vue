<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div class="container-fluid">
            <button class="btn btn-sm btn-link" @click="sidebar.open">
                <button class="btn btn-sm navbar-toggler-icon"></button>
            </button>
            <div class="me-auto">
                <router-link class="navbar-brand" to="/">LINTEC</router-link>
            </div>
            <UserAuth />
        </div>
    </nav>

    <Sidebar
        :isOpen="sidebar.isOpen.value"
        @close="sidebar.close"
    />
</template>

<script setup>
import { useToggle } from '@/composables/useToggle';
import UserAuth from '@/components/UserAuth.vue';
import Sidebar from '@/components/Sidebar.vue';

const sidebar = useToggle();
</script>