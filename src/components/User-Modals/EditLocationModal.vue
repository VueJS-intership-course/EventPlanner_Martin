<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change Location</h5>
          <button type="button" class="btn-close" @click="cancelModal"></button>
        </div>
        <form @submit.prevent="handleChangeLocation" class="modal-body">
          <div class="mb-3">
            <label for="password" class="col-form-label">Choose location</label>
            <Dropdown
              v-model="editedUser.location"
              id="location"
              :name="'location'"
              :label="'Location'"
            ></Dropdown>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStore } from '@/store/userStore.js';
import { useRouter } from 'vue-router';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { computed } from 'vue';

const router = useRouter();
const uStore = userStore();

const editedUser = computed(() => uStore.editedUser);
const currentUser = computed(() => uStore.currentUser);

const handleChangeLocation = async () => {
  try {
    await uStore.editUser(editedUser.value.location, currentUser.value);
    uStore.isChangingUserLocation = false;

    router.push({ name: 'profile' });
  } catch (error) {
    console.log(error);
  }
};

const cancelModal = () => {
  uStore.isChangingUserLocation = false;
};
</script>
