import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '@/assets/styles/bootstrap.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');