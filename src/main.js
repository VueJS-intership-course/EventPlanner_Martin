import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia';
import firebaseData from './services/firebaseConfig.js';
import { userStore } from './store/userStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router/index.js';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

const store = userStore();

firebaseData.fireAuth.onAuthStateChanged((user) => {
    if (user) {
        store.setCurrentUser(user);
    } else {
        store.setCurrentUser(null);
    }
});

app.mount('#app')
