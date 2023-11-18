import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import {createPinia} from 'pinia';
import firebaseData from '@/services/firebaseConfig.js';
import { userStore } from '@/store/userStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from '@/router/index.js';
import HighchartsVue from 'highcharts-vue'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(HighchartsVue);

const uStore = userStore();

function authStateChangedPromise() {
  return new Promise((resolve, reject) => {
    firebaseData.fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await uStore.setCurrentUser(user);
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        uStore.setCurrentUser(null);
        resolve(null);
      }
    });
  });
}

await authStateChangedPromise();

app.use(router);


app.mount('#app')
