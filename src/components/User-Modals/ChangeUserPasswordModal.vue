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
            <CustomInput label="Current Password" name="currentPassword" type="password"
                  field-type="currentPassword" placeholder-value="Type current password..." is-required/>
          </div>
          <div class="mb-4">
            <CustomInput label="New Password" name="newPassword" type="password"
                  field-type="newPassword" placeholder-value="Type new password..." is-required/>
          </div>
          <div class="mb-4">
            <CustomInput label="Repeat New Password" name="repeatPassword" type="password"
                  field-type="repeatPassword" placeholder-value="Repeat new password..." is-required/>
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
import {minPasswordLength} from '@/utils/constants.js';
import CustomInput from '@/components/Custom-Input/CustomInput.vue';

const schema = yup.object({
  currentPassword: yup.string().required('This field is required!'),
  newPassword: yup
    .string()
    .min(minPasswordLength, `Password must be at least ${minPasswordLength} characters!`)
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
