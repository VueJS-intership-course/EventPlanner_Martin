<template>
  <CustomModal modal-title="Change Location" @closeModal="cancelModal">
    <form @submit.prevent="handleChangeLocation" class="modal-body custom-form">
      <div class="mb-3">
        <Dropdown
          v-model="editedUser.location"
          :initial-location="currentUser.location"
          id="location"
          :name="'location'"
          :label="'Location'"
        ></Dropdown>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-save-location">Save</button>
      </div>
    </form>
  </CustomModal>
</template>

<script setup>
import { userStore } from '@/store/userStore.js';
import { useRouter } from 'vue-router';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { computed } from 'vue';
import CustomModal from '@/components/Custom-Modal/custommodal.vue'

const router = useRouter();
const uStore = userStore();

const editedUser = computed(() => uStore.editedUser);
const currentUser = computed(() => uStore.currentUser);

const handleChangeLocation = async () => {
  if (editedUser.value.location === '') {
    uStore.isChangingUserLocation = false;
    return;
  }

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

<style scoped lang="scss">
.custom-form {
  background-color: $lighter-gray;
}
.btn-save-location {
  background-color: $blue-cola;
  color: $classic-cream;

  &:hover {
    background-color: #00537c;
  }
}
</style>
