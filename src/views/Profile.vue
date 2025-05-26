<template>
    <div class="container">
        <h5 class="mb-3">設定</h5>
        <ProfileSection
            label="名前・メールアドレス"
            :isOpen="menu1.isOpen.value"
            :toggle="menu1.toggle"
        >
            <div>aaa</div>
        </ProfileSection>
        <ProfileSection
            label="パスワード"
            :isOpen="menu2.isOpen.value"
            :toggle="menu2.toggle"
        >
            <div>bbb</div>
        </ProfileSection>
        <div class="border-bottom"></div>
    </div>
</template>

<script setup>
import { useOpenClose } from '@/composables/useOpenClose';
import ProfileSection from '@/components/ProfileSection';

const menu1 = useOpenClose();
const menu2 = useOpenClose();
</script>