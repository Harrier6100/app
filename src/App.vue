<template>
    <Navbar />
    <main>
        <router-view />
    </main>
    <Confirm />
    <Toast />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Confirm from '@/components/Confirm.vue';
import Toast from '@/components/Toast.vue';
</script>