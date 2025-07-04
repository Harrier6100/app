import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    // const user = ref(null);
    const user = ref({
        name: '',
        role: 'admin',
        permissions: ['users:create'],
    });

    return {
        user,
    };
});