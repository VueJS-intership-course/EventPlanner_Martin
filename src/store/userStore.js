import { defineStore } from "pinia";
import userServices from '../services/users/userServices.js'

export const userStore = defineStore('userStore', {
    state: () => ({
        currentUser: null
    }),
    getters: {
        isAdmin(state) {
            return state.currentUser !== null ? state.currentUser.isAdmin : false;
        }
    },
    actions: {
        async setCurrentUser(user) {
            if (user) {
                this.currentUser = await userServices.getUser(user.uid);
            }
        }
    }
});