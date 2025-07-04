<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <div class="container-fluid">
            <button class="btn btn-link btn-sm" @click="sidebar.open">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="me-auto">
                <router-link class="navbar-brand" to="/">Brand</router-link>
            </div>
        </div>
    </nav>
    <Sidebar
        :isOpen="sidebar.isOpen.value"
        @close="sidebar.close"
    />
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar';
import Sidebar from '@/components/Sidebar.vue';
const sidebar = useSidebar();
</script>