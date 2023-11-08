<template>
  <div class="row py-5 px-4">
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
            <div class="p-4 bg-light rounded shadow-sm">
              <p class="font-italic mb-0 d-flex justify-content-center">
                <button class="btn" style="background-color: #212529; color: beige;">Change password</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStore } from '@/store/userStore';
import { computed } from 'vue';

const uStore = userStore();

const user = computed(() => uStore.currentUser);
</script>
