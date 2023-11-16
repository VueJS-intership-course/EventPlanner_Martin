import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import {createPinia} from 'pinia';
import firebaseData from '@/services/firebaseConfig.js';
import { userStore } from '@/store/userStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from '@/router/index.js';
import userServices from './services/users/userServices';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

const uStore = userStore();

// firebaseData.fireAuth.onAuthStateChanged((user) => {
//     if (user) {
//         uStore.setCurrentUser(user);
//     } else {
//         uStore.setCurrentUser(null);
//     }
// });

function authStateChangedPromise() {
    return new Promise((resolve, reject) => {
      firebaseData.fireAuth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const userData = await userServices.getUserData(user.email);
            console.log(userData);
            uStore.setCurrentUser(userData);
            resolve(userData);
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

app.mount('#app')
