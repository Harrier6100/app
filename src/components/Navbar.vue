<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Brand</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="menu1" role="button" data-bs-toggle="dropdown" aria-expanded="false">マスタ</a>
                        <ul class="dropdown-menu" aria-labelledby="menu1">
                            <li><router-link class="dropdown-item" to="/users">アカウント</router-link></li>
                        </ul>
                    </li>
                </ul>
                <UserAuth />
            </div>
        </div>
    </nav>
</template>

<script setup>
import UserAuth from '@/components/UserAuth';
</script>