<!-- <template>
  <div class="modal show mt-5 t-100" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change Password</h5>
        </div>
        <div class="modal-body">
          <Form @submit="handleChangePassword" :validation-schema="schema">
            <div class="form-group has-error d-flex flex-column ms-5 mt-3 mb-4 w-75">
              <label for="password" class="form-label">Password<span style="color: red;">*</span></label>
              <Field
              class="form-control"
                type="password"
                name="currPass"
                label="Current password"
                placeholder="Enter current password..."
                autocomplete
              />
              <ErrorMessage name="currPass" class="text-danger"/>
            </div>
            <div class="form-group d-flex flex-column ms-5 mt-3 mb-4 w-75">
              <label for="newPass" class="form-label">New Password<span style="color: red;">*</span></label>
              <Field
              class="form-control"
                type="password"
                name="newPass"
                label="New Password"
                placeholder="Enter new password..."
                autocomplete
              />
              <ErrorMessage name="newPass" class="text-danger"/>
            </div>
            <div class="form-group d-flex flex-column ms-5 mb-4 mt-3 w-75">
              <label for="rePass" class="form-label">Repeat Password<span style="color: red;">*</span></label>
              <Field
              class="form-control"
                type="password"
                name="rePass"
                label="Repeat New Password"
                placeholder="Repeat your new password..."
                autocomplete
              />
              <ErrorMessage name="rePass" class="text-danger"/>
            </div>
            <div class="form-group mt-4 text-center d-flex">
              <button
                class="btn btn-lg btn-primary btn-block mx-auto"
                type="submit"
              >
                Save
              </button>
              <button
                class="btn btn-lg btn-block mx-auto  btn-secondary"
                type="submit"
                @click="cancelModal"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template> -->
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
import { userStore } from '../store/userStore.js';
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
