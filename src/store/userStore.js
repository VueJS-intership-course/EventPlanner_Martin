import { defineStore } from 'pinia';
import userServices from '@/services/users/userServices.js';

export const userStore = defineStore('userStore', {
  state: () => ({
    currentUser: null,
    isChangingUserPassword: false,
    isChangingUserLocation: false,
    editedUser: {
      location: ''
    },
  }),
  getters: {
    isAdmin(state) {
      if (state.currentUser && state.currentUser.isAdmin) {
        return true;
      }
    },
    isLogged(state) {
      if (state.currentUser) {
        return true;
      }
    },
  },
  actions: {
    async setCurrentUser(user) {
      if (user) {
        this.currentUser = await userServices.getUser(user.uid);
      }
    },
    async changePassword(email, currentPassword, newPassword) {
      await userServices.changePassword(email, currentPassword, newPassword);
      this.currentUser = null;
    },
    async editUser(userLocation, user) {
      try {
        await userServices.editUserLocation(userLocation, user);
        this.currentUser.location = userLocation;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
