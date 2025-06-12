<template>
    <div class="mb-3">
        <router-link to="/setting" class="text-decoration-none text-dark">
            <i class="bi bi-arrow-left me-2"></i>設定
        </router-link>
    </div>

    <div class="border-top">
        <router-link class="text-decoration-none text-dark" to="/setting/profile/name">
            <div class="d-flex flex-row py-3">
                <div class="flex-shrink-0">名前</div>
                <div class="w-100 d-flex">
                    <i class="bi bi-arrow-right ms-auto"></i>
                </div>
            </div>
        </router-link>
    </div>

    <div class="border-top border-bottom">
        <router-link class="text-decoration-none text-dark" to="/setting/profile/email">
            <div class="d-flex flex-row py-3">
                <div class="flex-shrink-0">メールアドレス</div>
                <div class="w-100 d-flex">
                    <i class="bi bi-arrow-right ms-auto"></i>
                </div>
            </div>
        </router-link>
    </div>
</template>