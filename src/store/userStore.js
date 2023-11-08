import { defineStore } from "pinia";
import userServices from '@/services/users/userServices.js'

export const userStore = defineStore('userStore', {
    state: () => ({
        currentUser: null
    }),
    getters: {
        isAdmin(state) {
            // return state.currentUser !== null ? state.currentUser.isAdmin : false;
            if (state.currentUser && state.currentUser.isAdmin) {
                return true
            }
        },
        isLogged(state) {
            if (state.currentUser) {
                return true
            }
        }
    },
    actions: {
        async setCurrentUser(user) {
            // this.currentUser = user;
            if (user) {
                this.currentUser = await userServices.getUser(user.uid);
                console.log(this.currentUser);
            }
        }
    }
});