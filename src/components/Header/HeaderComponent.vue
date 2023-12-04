<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div>
      <RouterLink :to="'/home'">
        <img
          src="@/utils/logo/Logo.png"
          style="width: 100px; height: 75px;"
        />
      </RouterLink>
    </div>
    <div
      class="collapse navbar-collapse d-flex justify-content-end"
      id="navbarNav"
    >
      <ul class="navbar-nav ml-auto">
        <li v-if="isAdmin" class="nav-item custom-nav-item px-2">
          <span class="nav-link custom-nav-link fw-bold fs-5 text-danger"
            ><i class="bi bi-shield-lock"></i>Admin</span
          >
        </li>
        <li v-if="!isAdmin && isLoggedIn" class="nav-item custom-nav-item px-2">
          <span class="nav-link custom-nav-link fw-bold fs-5" style="color: #f50500;"
            >Hi, {{ uStore.currentUser.username }}!</span
          >
        </li>
        <li v-if="!isLoggedIn" class="nav-item custom-nav-item px-2">
          <RouterLink
            :to="'/login'"
            class="nav-link custom-nav-link fw-bold fs-5 login"
            :class="{ active: isActive('/login') }"
            >Login</RouterLink
          >
        </li>
        <li class="nav-item custom-nav-item px-2">
          <RouterLink
            :to="'/events'"
            class="nav-link custom-nav-link fw-bold fs-5"
            :class="{ active: isActive('/events') }"
            >Events</RouterLink
          >
        </li>
        <li v-if="isLoggedIn" class="nav-item custom-nav-item px-2">
          <RouterLink
            :to="'/profile'"
            class="nav-link custom-nav-link fw-bold fs-5"
            :class="{ active: isActive('/profile') }"
            >Profile</RouterLink
          >
        </li>
        <li v-if="isLoggedIn" class="nav-item custom-nav-item px-2">
          <button @click="handleLogout" class="btn custom-btn fw-bold fs-5">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { userStore } from '@/store/userStore.js';

const uStore = userStore();

const isLoggedIn = computed(() => uStore.isLoggedIn);
const isAdmin = computed(() => uStore.isAdmin);

const router = useRouter();

const handleLogout = async () => {
  await uStore.logout();

  router.push({ name: 'login' });
};

const isActive = (route) => {
  return router.currentRoute.value.path === route;
};
</script>

<style scoped lang="scss">
.custom-navbar {
  background-color: $dark-gray;

  .custom-nav-item {
    .custom-nav-link {
      color: $off-white;

      &:hover {
        color: $vibrant-teal;
      }
    }
    .active {
      color: $vibrant-teal !important;
      border-bottom: 3px solid $vibrant-teal;
    }

    .custom-btn {
      background-color: $dark-gray;
      color: $off-white;
      border: none;
      padding: 8px;

      &:hover {
        color: $vibrant-teal;
      }
    }
  }
}

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
