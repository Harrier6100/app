<template>
    <div class="container">

        <div class="mb-3">
            <router-link to="/setting">
                <button class="btn btn-link text-decoration-none text-dark">
                    <div class="d-flex gap-1">
                        <i class="bi bi-arrow-left me-1"></i>
                        <span>戻る</span>
                    </div>
                </button>
            </router-link>
        </div>

        <div class="list-group">

            <router-link class="list-group-item list-group-item-action rounded-0 border-start-0 border-end-0" to="/setting/profile/name">
                <div class="d-flex justify-content-between py-2">
                    <span>名前</span>
                    <i class="bi bi-arrow-right"></i>
                </div>
            </router-link>

            <router-link class="list-group-item list-group-item-action rounded-0 border-start-0 border-end-0" to="/setting/profile/email">
                <div class="d-flex justify-content-between py-2">
                    <span>メールアドレス</span>
                    <i class="bi bi-arrow-right"></i>
                </div>
            </router-link>
        </div>

    </div>
</template>