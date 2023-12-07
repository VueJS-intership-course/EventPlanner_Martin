import { defineStore } from 'pinia';
import userServices from '@/services/users/userServices.js';

export const userStore = defineStore('userStore', {
  state: () => ({
    currentUser: null,
    isChangingUserPassword: false,
    isChangingUserLocation: false,
    isChangingUserImage: false,
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
    isLoggedIn(state) {
      return Boolean(state.currentUser);
    },
  },
  actions: {
    async setCurrentUser(user) {
      if (user) {
        const userData = await userServices.getUserData(user.email);
        this.currentUser = userData;
      }
    },
    async logout() {
      await userServices.logout();
      this.currentUser = null;
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
    async setProfileImage(imageUrl, user) {
      try {
        console.log(imageUrl);
        await userServices.setProfileImage(imageUrl, user);
        this.currentUser.imageUrl = imageUrl;
      } catch (error) {
        console.error(error);
      }
    }
  },
});
