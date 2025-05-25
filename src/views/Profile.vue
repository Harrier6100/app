<template>
    <div class="container">
        <h5 class="mb-3">設定</h5>
        <div class="border-top border-bottom py-3" role="button" @click="menu1.toggle">
            <div class="d-flex">
                <div class="me-auto">
                    <a class="text-dark text-decoration-none">名前・メールアドレス</a>
                </div>
                <i class="bi bi-chevron-right" v-if="!menu1.isOpen.value"></i>
                <i class="bi bi-chevron-down" v-if="menu1.isOpen.value"></i>
            </div>
            <div class v-if="menu1.isOpen.value">
                aaa
            </div>
        </div>
        <div class="border-bottom py-3" role="button" @click="menu2.toggle">
            <div class="d-flex">
                <div class="me-auto">
                    <a class="text-dark text-decoration-none">パスワード</a>
                </div>
                <i class="bi bi-chevron-right" v-if="!menu2.isOpen.value"></i>
                <i class="bi bi-chevron-down" v-if="menu2.isOpen.value"></i>
            </div>
            <div class v-if="menu2.isOpen.value">
                aaa
            </div>
        </div>
    </div>
</template>

<script setup>
import { useOpenClose } from '@/composables/useOpenClose';

const menu1 = useOpenClose();
const menu2 = useOpenClose();
</script>