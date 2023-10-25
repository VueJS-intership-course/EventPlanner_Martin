<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <Field v-model="formData.username" name="username" class="form-control" id="username"
                  placeholder="Username" />
                <ErrorMessage name="Username" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field v-model="formData.email" name="email" type="email" class="form-control" id="email"
                  placeholder="Email" />
                <ErrorMessage name="Email" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <Dropdown v-model="formData.location" id="location">
                </Dropdown>
                <ErrorMessage name="Location" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <Field v-model="formData.password" name="password" type="password" class="form-control" id="password"
                  autocomplete="on" placeholder="Password" />
                <ErrorMessage name="Password" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="repeatPassword" class="form-label">Repeat password</label>
                <Field v-model="formData.repeatPassword" name="repeatPassword" type="password" class="form-control"
                  id="repeatPassword" autocomplete="on" placeholder="Repeat password" />
              </div>
              <div class="mb-3">
                <button class="btn btn-primary" btn-style="default-button-small">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import userServices from '../../services/users/userServices.js';
import { Field, Form, ErrorMessage } from 'vee-validate';
import Dropdown from '../../common-templates/Dropdown.vue';
// import * as yup from "yup";

const formData = {
  username: '',
  email: '',
  location: '',
  password: '',
  repeatPassword: '',
};

const onSubmit = async () => {
  try {
    // console.log(formData);
    await userServices.signUp(
      {
        email: formData.email,
        username: formData.username,
        location: formData.location,
      },
      formData.password
    );
    console.log('User registered successfully');
  } catch (error) {
    alert(error);
  }
};
</script>