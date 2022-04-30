import router from '@/router/index';
import store from '@/store';
import App from './App.vue';

import 'virtual:windi.css';
import 'virtual:windi-devtools';
import '@/assets/styles/index.scss';

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');
