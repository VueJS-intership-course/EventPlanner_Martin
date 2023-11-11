<template>
  <HeaderComponent></HeaderComponent>
  <!-- <img class="photo" src="./utils/Overview.png" alt=""> -->
  <RouterView></RouterView>
</template>

<script setup>
import HeaderComponent from '@/common-templates/HeaderComponent.vue';
</script>

<style scoped>
.photo {
  /* width: 100%;
  height: calc(100vh - 91px);
  z-index: -100;
  position: absolute; */
}
</style>