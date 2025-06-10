<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <div class="container-fluid">
            <div class="me-auto">
                <router-link class="navbar-brand" to="/">LINTEC</router-link>
            </div>
            <UserAuth />
        </div>
    </nav>
</template>

<script setup>
import UserAuth from '@/components/UserAuth.vue';
</script>