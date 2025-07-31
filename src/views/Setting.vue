<template>
    <div class="container">
        <h6 class="mb-3">設定</h6>

        <div class="list-group">
            <router-link class="list-group-item list-group-item-action border-start-0 border-end-0 rounded-0" to="/setting/profile">
                <div class="d-flex justify-content-between">
                    <span>プロフィール</span>
                    <i class="bi bi-chevron-right"></i>
                </div>
            </router-link>
        </div>

        <div class="list-group">
            <router-link class="list-group-item list-group-item-action border-start-0 border-top-0 border-end-0 rounded-0" to="/setting/password">
                <div class="d-flex justify-content-between">
                    <span>パスワード</span>
                    <i class="bi bi-chevron-right"></i>
                </div>
            </router-link>
        </div>
        
    </div>
</template>