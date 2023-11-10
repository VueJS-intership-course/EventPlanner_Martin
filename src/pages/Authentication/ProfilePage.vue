<template>
  <div class="row py-5 px-4 w-100">
    <div class="col-xl-4 col-md-6 col-sm-10 mx-auto">
      <div v-if="user" class="bg-white shadow rounded overflow-hidden">
        <div class="px-4 pt-4 pb-4 bg-dark">
          <div class="media align-items-end profile-header">
            <div class="profile mr-3">
              <img
                src="https://bootstrapious.com/i/snippets/sn-profile/teacher.jpg"
                alt="..."
                width="130"
                class="rounded mb-2 img-thumbnail"
              />
            </div>
            <div class="media-body mb-5 text-white">
              <h4 class="mt-0 mb-0">{{ user.username }}</h4>
              <p class="small mb-4">
                <i class="fa fa-map-marker mr-2"></i>{{ user.email }}
              </p>
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
          <div class="py-4">
            <div class="p-4 bg-light rounded shadow-sm d-flex justify-content-between">
              <p class="font-italic d-flex">
                <button @click="changingPassword" class="btn me-5" style="background-color: #212529; color: beige;">Change Password</button>
                <button @click="changingLocation" class="btn ms-5" style="background-color: #212529; color: beige;">Change Location</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ChangeUserPasswordModal v-if="uStore.isChangingUserPassword"/>
  <EditLocationModal v-if="uStore.isChangingUserLocation"/>
</template>

<script setup>
import { userStore } from '@/store/userStore';
import { computed } from 'vue';
import ChangeUserPasswordModal from '@/common-templates/ChangeUserPasswordModal.vue';
import EditLocationModal from '../../common-templates/EditLocationModal.vue';

const uStore = userStore();

const user = computed(() => uStore.currentUser);

const changingPassword = () => {
  uStore.isChangingUserPassword = true;
}

const changingLocation = () => {
  uStore.isChangingUserLocation = true;
}
</script>
