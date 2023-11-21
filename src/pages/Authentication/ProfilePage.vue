<template>
  <div class="overlay" v-if="uStore.isChangingUserLocation || uStore.isChangingUserPassword"></div>
  <div class="container-fluid">
    <div class="row align-items-start justify-content-around mt-5 ms-3 me-3">
      <div class="col-lg-4">
        <div v-if="user" class="bg-white shadow rounded overflow-hidden">
          <div class="px-4 pt-4 pb-4 bg-dark text-white">
            <div class="media align-items-end profile-header">
              <div class="profile mr-3">
                <img src="../../utils/images//user-128.png" alt="..." width="130" class="rounded mb-2 img-thumbnail"/>
              </div>
              <div class="media-body mb-5">
                <h4 class="mt-0 mb-0">{{ user.username }}</h4>
                <p class="small mb-4"><i class="fa fa-map-marker mr-2"></i>{{ user.email }}</p>
              </div>
            </div>
          </div>
          <div class="bg-light p-4 d-flex justify-content-end text-center">
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <h5 class="font-weight-bold mb-0 d-block">{{ user.location }}</h5>
              </li>
            </ul>
          </div>
          <div class="py-4 px-4">
            <div class="p-4 bg-light rounded shadow-sm d-flex justify-content-around">
              <button @click="changingPassword" class="btn" style="background-color: #212529; color: beige">Change Password</button>
              <button @click="changingLocation" class="btn" style="background-color: #212529; color: beige">Change Location</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="user && !uStore.isAdmin" class="col-lg-5">
        <Calendar :userEvents="userEvents"></Calendar>
      </div>
    </div>
  </div>
  <ChangeUserPasswordModal v-if="uStore.isChangingUserPassword" />
  <EditLocationModal v-if="uStore.isChangingUserLocation" />
</template>


<script setup>
import { userStore } from '@/store/userStore';
import { eventStore } from '@/store/eventStore';
import { computed, onMounted } from 'vue';
import ChangeUserPasswordModal from '@/components/User-Modals/ChangeUserPasswordModal.vue';
import EditLocationModal from '@/components/User-Modals/EditLocationModal.vue';
import Calendar from '@/components/Calendar/Calendar.vue';

const uStore = userStore();
const eStore = eventStore();
eStore.getEvents();
const user = computed(() => uStore.currentUser);
const events = computed(() => eStore.events);

const usersAndTheirEvents = computed(() => {
  return events.value.filter((event) =>
    event.clients.includes(user.value.email)
  );
});

const userEvents = computed(() =>
  usersAndTheirEvents.value.map((event) => ({
    title: event.name,
    start: event.time,
    id: event.id
  }))
);

const changingPassword = () => {
  uStore.isChangingUserPassword = true;
};

const changingLocation = () => {
  uStore.isChangingUserLocation = true;
};

onMounted(() => {
  eStore.getEvents();
});
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 10;
}
</style>