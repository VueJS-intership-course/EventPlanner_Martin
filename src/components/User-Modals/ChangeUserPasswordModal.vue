<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="border: none">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title">Change Password</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="cancelModal"
          ></button>
        </div>
        <Form
          @submit="handleChangePassword"
          :validation-schema="schema"
          class="modal-body custom-form"
        >
          <div class="mb-4">
            <label for="currentPassword" class="col-form-label custom-col-form-label"
              >Current Password:</label
            >
            <Field
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Enter current password"
              class="form-control"
              autocomplete="current-password"
            />
            <ErrorMessage name="currentPassword" class="text-danger position-absolute" />
          </div>
          <div class="mb-4">
            <label for="newPassword" class="col-form-label custom-col-form-label"
              >New Password:</label
            >
            <Field
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              class="form-control"
              autocomplete="new-password"
            />
            <ErrorMessage name="newPassword" class="text-danger position-absolute" />
          </div>
          <div class="mb-4">
            <label for="repeatPassword" class="col-form-label custom-col-form-label"
              >Repeat New Password:</label
            >
            <Field
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              placeholder="Repeat new password"
              class="form-control"
              autocomplete="new-password"
            />
            <ErrorMessage name="repeatPassword" class="text-danger position-absolute" />
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
import { useRouter } from 'vue-router';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  currentPassword: yup.string().required('This field is required!'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 symbols!')
    .required('This field is required!'),
  repeatPassword: yup
    .string()
    .required('This field is required!')
    .oneOf([yup.ref('newPassword')], 'Passwords does not match!'),
});

const router = useRouter();
const uStore = userStore();

const handleChangePassword = async (values) => {
  try {
    await uStore.changePassword(
      uStore.currentUser.email,
      values.currentPassword,
      values.newPassword
    );

    uStore.isChangingUserPassword = false;

    router.push({ name: 'login' });
  } catch (error) {
    console.log(error);
  }
};

const cancelModal = () => {
  uStore.isChangingUserPassword = false;
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

.custom-col-form-label {
  color: $classic-cream;
}
</style>
