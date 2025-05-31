<template>
    <div v-if="store.isOpen">
        <div class="modal-backdrop show"></div>
        <div class="modal show d-block" @click.self="store.cancel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>{{ store.message }}</p>
                        <button @click="store.confirm">はい</button>
                        <button @click="store.cancel">いいえ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useConfirmStore } from '@/stores/useConfirmStore';
const store = useConfirmStore();
</script>