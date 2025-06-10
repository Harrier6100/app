<template>
    <Navbar />
    <div class="container-fluid">
        <div class="mb-3">
        </div>
        <router-view />
    </div>
    <Confirm />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Confirm from '@/components/Confirm.vue';

export default {
    name: 'App',
    components: {
        Navbar,
        Confirm,
    },
};
</script>