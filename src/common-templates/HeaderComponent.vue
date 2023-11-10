<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div>
      <RouterLink :to="'/events'">
        <img
          src="../utils/logo/Event_Planner LOGO.png"
          style="width: 100px; height: 75px"
        />
      </RouterLink>
    </div>
    <div
      class="collapse navbar-collapse d-flex justify-content-end"
      id="navbarNav"
    >
      <ul class="navbar-nav ml-auto">
        <li v-if="isAdmin" class="nav-item px-2">
          <span class="nav-link fw-bold fs-5"
            ><i class="bi bi-shield-lock"></i>Admin</span
          >
        </li>
        <li v-if="!isAdmin && isLoggedIn" class="nav-item px-2">
          <span class="nav-link fw-bold fs-5 text-danger"
            >Hi, {{ uStore.currentUser.username }}!</span
          >
        </li>
        <li v-if="!isLoggedIn" class="nav-item px-2">
          <RouterLink
            :to="'/login'"
            class="nav-link nav-link-hover fw-bold fs-5"
            >Login</RouterLink
          >
        </li>
        <li class="nav-item px-2">
          <RouterLink
            :to="'/events'"
            class="nav-link nav-link-hover fw-bold fs-5"
            >Events</RouterLink
          >
        </li>
        <li v-if="isLoggedIn" class="nav-item px-2">
          <RouterLink
            :to="'/profile'"
            class="nav-link nav-link-hover fw-bold fs-5"
            >Profile</RouterLink
          >
        </li>
        <li v-if="isLoggedIn" class="nav-item px-2 mt-2">
          <button @click="handleLogout" class="fw-bold fs-5">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import userServices from '@/services/users/userServices';
import { computed } from 'vue';
import { userStore } from '@/store/userStore.js';

const uStore = userStore();

const isLoggedIn = computed(() => uStore.isLogged);
console.log(isLoggedIn);
const isAdmin = computed(() => uStore.isAdmin);

console.log(isAdmin);

const router = useRouter();

const handleLogout = async () => {
  uStore.currentUser = null;
  await userServices.logout();

  router.push({ name: 'login' });
};
</script>

<style lang="scss">
button {
  background-color: #0d6efd;
  color: #052c65;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;

  &:hover {
    color: rgb(#000, 0.8);
  }
}
</style>
