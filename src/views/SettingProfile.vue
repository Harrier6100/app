<template>
    <div class="container">
        <h6 class="mb-3">設定</h6>

        <div class="mb-3">
            <router-link class="text-dark text-decoration-none" to="/setting">
                <i class="bi bi-chevron-left"></i>
            </router-link>
        </div>
            
        <div class="list-group">
            <router-link class="list-group-item list-group-item-action border-start-0 border-end-0 rounded-0" to="/setting/profile/name">
                <div class="d-flex justify-content-between">
                    <span>名前</span>
                    <i class="bi bi-chevron-right"></i>
                </div>
            </router-link>
        </div>

        <div class="list-group">
            <router-link class="list-group-item list-group-item-action border-start-0 border-top-0 border-end-0 rounded-0" to="/setting/profile/email">
                <div class="d-flex justify-content-between">
                    <span>メールアドレス</span>
                    <i class="bi bi-chevron-right"></i>
                </div>
            </router-link>
        </div>
        
    </div>
</template>