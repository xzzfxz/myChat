import { createApp } from 'vue';
import App from './App.vue';
import './assets/style/global.scss';
import router from '@/router';
import { createPinia } from 'pinia';

createApp(App).use(createPinia()).use(router).mount('#app');
