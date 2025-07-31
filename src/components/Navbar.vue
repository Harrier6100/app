<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div class="container-fluid">
            <button class="btn btn-primary" type="button" @click="sidebarDisclosure.open">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="me-auto">
                <router-link class="navbar-brand" to="/">Brand</router-link>
            </div>
            <Authentication />
        </div>
    </nav>

    <Sidebar
        v-if="sidebarDisclosure.isOpen.value"
        :isOpen="sidebarDisclosure.isOpen.value"
        @close="sidebarDisclosure.close"
    />
</template>

<script setup>
import { useDisclosure } from '@/composables/useDisclosure';
import Authentication from '@/components/Authentication.vue';
import Sidebar from '@/components/Sidebar.vue';

const sidebarDisclosure = useDisclosure();
</script>