<template>
    <div class="container">

        <div class="mb-3">
            <router-link class="text-decoration-none text-dark" to="/setting">
                <div class="d-flex gap-1">
                    <i class="bi bi-arrow-left me-1"></i>
                    <span>設定</span>
                </div>
            </router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-10 col-xl-8">
                <form @submit.prevent="save" autocomplete="off">

                    <div class="py-3">
                        <div class="row mb-3">
                            <label class="col-sm-5 col-md-4 col-form-label" for="password">新しいパスワード</label>
                            <div class="col-sm-7 col-md-8">
                                <input class="form-control" type="password" id="password" v-model="form.password">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-5 col-md-4 col-form-label" for="passwordConfirm">新しいパスワード確認</label>
                            <div class="col-sm-7 col-md-8">
                                <input class="form-control" type="password" id="passwordConfirm" v-model="form.passwordConfirm">
                            </div>
                        </div>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isAsync" class="spinner-border spinner-border-sm me-1" role="status"></span>保存
                        </button>
                    </div>

                </form>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    password: '',
});
</script>