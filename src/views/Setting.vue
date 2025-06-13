<template>
    <div class="mb-3">設定</div>

    <div class="border-top">
        <router-link class="text-decoration-none text-dark" to="/setting/profile">
            <div class="d-flex flex-row py-3">
                <div class="flex-shrink-0">プロフィール</div>
                <div class="w-100 d-flex">
                    <i class="bi bi-arrow-right ms-auto"></i>
                </div>
            </div>
        </router-link>
    </div>

    <div class="border-top border-bottom">
        <router-link class="text-decoration-none text-dark" to="/setting/password">
            <div class="d-flex flex-row py-3">
                <div class="flex-shrink-0">パスワード</div>
                <div class="w-100 d-flex">
                    <i class="bi bi-arrow-right ms-auto"></i>
                </div>
            </div>
        </router-link>
    </div>
</template>