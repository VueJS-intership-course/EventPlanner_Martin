<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="onSubmit" :validationSchema="validation">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <Field v-model="formData.username" name="username" class="form-control" id="username"
                  placeholder="Enter username..." />
                <ErrorMessage name="username" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field v-model="formData.email" name="email" type="email" class="form-control" id="email"
                  placeholder="Enter email..." />
                <ErrorMessage name="email" class="text-danger" />
              </div>
              <div class="mb-3">
                <Dropdown v-model="formData.location" id="location" :name="'location'" :label="'Location'"></Dropdown>
                <ErrorMessage name="location" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <Field v-model="formData.password" name="password" type="password" class="form-control" id="password"
                  autocomplete="on" placeholder="Enter password..." />
                <ErrorMessage name="password" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="repeatPassword" class="form-label">Repeat password</label>
                <Field v-model="formData.repeatPassword" name="repeatPassword" type="password" class="form-control"
                  id="repeatPassword" autocomplete="on" placeholder="Repeat the password..." />
                <ErrorMessage name="repeatPassword" class="text-danger" />
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary" btn-style="default-button-small">
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
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const validation = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  location: yup.string().required(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  repeatPassword: yup
    .string()
    .required('Repeat password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const router = useRouter();

const formData = {
  username: '',
  email: '',
  location: '',
  password: '',
  repeatPassword: '',
};

const onSubmit = async () => {
  console.log('here');
  try {
    // await validation.validate(formData, { abortEarly: false });

    if (formData.password !== formData.repeatPassword) {
      throw new Error('Passwords do not match!');
    }
    console.log(formData);
    await userServices.signUp(
      {
        email: formData.email,
        username: formData.username,
        location: formData.location,
      },
      formData.password
    );
    console.log('User registered successfully');

    router.push({ name: 'events' });
  } catch (error) {
    console.log(error);
  }
};
</script>