import { defineStore } from "pinia";

export const userStore = defineStore('userStore', {
    state: () => ({
        currentUser: null
    }),
    actions: {
        setCurrentUser(user) {
            this.currentUser = user;
        }
    }
});