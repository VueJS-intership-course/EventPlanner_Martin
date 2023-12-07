<template>
  <div
    class="custom-overlay"
    v-if="
      uStore.isChangingUserLocation ||
      uStore.isChangingUserPassword ||
      uStore.isChangingUserImage
    "
  ></div>
  <div class="container-fluid">
    <div class="row align-items-start justify-content-around mt-5 ms-3 me-3">
      <div class="col-lg-4">
        <div v-if="user" class="bg-white shadow rounded overflow-hidden">
          <div class="px-4 pt-4 pb-4 text-white user-container">
            <div class="media align-items-end profile-header">
              <div class="profile mr-3 d-flex" style="z-index: 100">
                <div class="image-edit-wrapper" @click="openImageModal">
                  <img
                    v-if="!user.imageUrl"
                    src="@/utils/images//user-128.png"
                    alt="..."
                    width="130"
                    class="rounded mb-2 img-thumbnail"
                  />
                  <img
                    v-if="user.imageUrl"
                    :src="user.imageUrl"
                    alt="..."
                    width="150"
                    class="rounded mb-2 img-thumbnail img-fluid"
                  />
                  <span class="edit-text"><i class="bi bi-pencil"></i></span>
                </div>
              </div>
              <div class="media-body mb-5">
                <h4 class="mt-0 mb-0">@{{ user.username }}</h4>
                <p class="small mb-4">
                  <i class="fa fa-map-marker mr-2"></i>{{ user.email }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-light p-4 d-flex justify-content-end text-center">
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <h5 class="font-weight-bold mb-0 d-block">
                  {{ user.location }}
                </h5>
              </li>
            </ul>
          </div>
          <div class="py-4 px-4">
            <div
              class="p-4 bg-light rounded shadow-sm d-flex justify-content-around"
            >
              <button
                @click="changingPassword"
                class="btn"
                style="background-color: #212529; color: beige"
              >
                Change Password
              </button>
              <button
                @click="changingLocation"
                class="btn"
                style="background-color: #212529; color: beige"
              >
                Change Location
              </button>
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
  <ImageModal v-if="uStore.isChangingUserImage"></ImageModal>
</template>

<script setup>
import { userStore } from '@/store/userStore';
import { eventStore } from '@/store/eventStore';
import { computed, onMounted } from 'vue';
import ChangeUserPasswordModal from '@/components/User-Modals/ChangeUserPasswordModal.vue';
import EditLocationModal from '@/components/User-Modals/EditLocationModal.vue';
import ImageModal from '@/components/User-Modals/ImageModal.vue';
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
    id: event.id,
  }))
);

const changingPassword = () => {
  uStore.isChangingUserPassword = true;
};

const changingLocation = () => {
  uStore.isChangingUserLocation = true;
};

const openImageModal = () => {
  uStore.isChangingUserImage = true;
};

onMounted(() => {
  eStore.getEvents();
});
</script>

<style scoped lang="scss">
.custom-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 10;
}

.image-icon {
  font-size: 24px;
  cursor: pointer;
}

.user-container {
  background-color: $dark-gray;
}

.image-edit-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;

  .edit-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-align: center;
    z-index: 20;
  }

  &:hover .edit-text {
    display: block;
  }
}
</style>
