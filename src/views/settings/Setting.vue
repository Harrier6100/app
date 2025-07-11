<template>
    <div class="container">

        <h6 class="mb-3">設定</h6>

        <div class="list-group">

            <router-link class="list-group-item list-group-item-action rounded-0 border-start-0 border-end-0" to="/setting/profile">
                <div class="d-flex justify-content-between py-2">
                    <span>プロフィール</span>
                    <i class="bi bi-arrow-right"></i>
                </div>
            </router-link>

            <router-link class="list-group-item list-group-item-action rounded-0 border-start-0 border-end-0" to="/setting/password">
                <div class="d-flex justify-content-between py-2">
                    <span>パスワード</span>
                    <i class="bi bi-arrow-right"></i>
                </div>
            </router-link>
        </div>

    </div>
</template>