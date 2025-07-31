<template>
    <Navbar />
    <main>
        <router-view />
    </main>

    <Confirm />
    <ToastContainer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Confirm from '@/components/Confirm.vue';
import ToastContainer from '@/components/ToastContainer.vue';
</script>