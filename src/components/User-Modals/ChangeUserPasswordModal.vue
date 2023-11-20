<template>
  <div class="modal show" style="display: block;">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change Password</h5>
          <button type="button" class="btn-close" @click="cancelModal"></button>
        </div>
        <Form @submit="handleChangePassword" :validation-schema="schema" class="modal-body">
          <div class="mb-3">
            <label for="password" class="col-form-label">Current Password:</label>
            <Field
              id="password"
              name="currPass"
              type="password"
              placeholder="Enter current password"
              class="form-control"
              autocomplete="current-password"
            />
            <ErrorMessage name="currPass" class="text-danger mt-1"/>
          </div>
          <div class="mb-3">
            <label for="newPass" class="col-form-label">New Password:</label>
            <Field
              id="newPass"
              name="newPass"
              type="password"
              placeholder="Enter new password"
              class="form-control"
              autocomplete="new-password"
            />
            <ErrorMessage name="newPass" class="text-danger mt-1"/>
          </div>
          <div class="mb-3">
            <label for="rePass" class="col-form-label">Repeat New Password:</label>
            <Field
              id="rePass"
              name="rePass"
              type="password"
              placeholder="Repeat new password"
              class="form-control"
              autocomplete="new-password"
            />
            <ErrorMessage name="rePass" class="text-danger mt-1"/>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Save</button>
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

const schema =  yup.object({
        currPass: yup
            .string()
            .required('This field is required!'),
        newPass: yup
            .string()
            .min(8, 'Password must be at least 8 symbols!')
            .required('This field is required!'),
        rePass: yup
            .string()
            .required('This field is required!')
            .oneOf([yup.ref('newPass')], 'Passwords does not match!'),
    })


const router = useRouter();
const uStore = userStore();

const handleChangePassword = async (values) => {
    try {
        await uStore.changePassword(uStore.currentUser.email, values.currPass, values.newPass);

        uStore.isChangingUserPassword = false;

        router.push({ name: 'login' })
    } catch (error) {
        console.log(error);
    }
}

const cancelModal = () => {
  uStore.isChangingUserPassword = false;
}
</script>
