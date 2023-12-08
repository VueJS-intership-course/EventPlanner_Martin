import { createApp } from 'vue'
import '@/styles/style.scss';
import App from '@/App.vue'
import {createPinia} from 'pinia';
import firebaseData from '@/services/firebaseConfig.js';
import { userStore } from '@/store/userStore.js';
import router from '@/router/index.js';
import highCharts from '@/plugins/highChart.js';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(highCharts);

const storeForUser = userStore();

function authStateChangedPromise() {
  return new Promise((resolve, reject) => {
    firebaseData.fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await storeForUser.setCurrentUser(user);
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        storeForUser.setCurrentUser(null);
        resolve(null);
      }
    });
  });
}

await authStateChangedPromise();

app.use(router);


app.mount('#app')
