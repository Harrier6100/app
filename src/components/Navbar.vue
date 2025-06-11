<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <div class="container-fluid">
            <div class="me-auto">
                <router-link class="navbar-brand" to="/">Brand</router-link>
            </div>
            <Auth />
        </div>
    </nav>
</template>

<script setup>
import Auth from '@/components/Auth.vue';
</script>