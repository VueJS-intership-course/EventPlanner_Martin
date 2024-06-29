<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="border: none">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title">Set Image</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="cancelModal"
          ></button>
        </div>
        <div v-if="imageError" class="alert alert-danger">
              {{ imageError }}
            </div>
        <Form @submit="handleSetImage" :validation-schema="schema" class="modal-body custom-form">
          <div class="mb-4">
            <label
              class="form-control-label custom-form-control-label"
              for="imageFile"
            >
              Choose Image<span class="text-danger">*</span>
            </label>
            <Field
              type="file"
              class="form-control"
              id="imageFile"
              name="imageFile"
              ref="imageFile"
              @change="handleFileUpload"
            />
            <ErrorMessage name="imageFile" class="text-danger position-absolute"/>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-save">Save</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStore } from '@/store/userStore.js';
import { computed, ref } from 'vue';
import firebaseData from '@/services/firebaseConfig.js';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const schema = yup.object({
  imageFile: yup.mixed().required('This field is required!'),
})

const uStore = userStore();

const imageUrl = ref('');
const imageError = ref('')
const errorMsgImage = ref('');
const firebaseStorage = firebaseData.fireStorage.ref();
const currentUser = computed(() => uStore.currentUser);

const handleFileUpload = async (event) => {
  const imageFile = event.target.files[0];
  const storageRef = firebaseStorage.child(`images/${imageFile.name}`);
  try {
    const snapshot = await storageRef.put(imageFile);
    imageUrl.value = await snapshot.ref.getDownloadURL();
  } catch (error) {
    imageError.value = error;
  }
};

const handleSetImage = async () => {
  if (!imageUrl.value) {
    errorMsgImage.value = 'Please select a image!';
    return;
  }

  try {
    await uStore.setProfileImage(imageUrl.value, currentUser.value);
    uStore.isChangingUserImage = false;
  } catch (error) {
    imageError.value = error;
  }
};

const cancelModal = () => {
  uStore.isChangingUserImage = false;
};
</script>

<style scoped lang="scss">
.custom-form {
  background-color: $lighter-gray;
}

.custom-modal-header {
  background-color: $dark-gray;
  color: $classic-cream;
}
.btn-save {
  background-color: $blue-cola;
  color: $classic-cream;

  &:hover {
    background-color: #00537c;
  }
}

.custom-form-control-label {
  color: $classic-cream;
}
</style>
