<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card custom-card">
          <div class="card-header custom-card-header">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <Form @submit="onSubmit" :validationSchema="validation">
              <div class="mb-3">
                <label for="username" class="form-label custom-form-label"
                  >Username<span style="color: red">*</span></label
                >
                <Field
                  v-model="formData.username"
                  type="username"
                  name="username"
                  class="form-control"
                  id="username"
                  placeholder="Enter username..."
                />
                <ErrorMessage name="username" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label custom-form-label"
                  >Email<span style="color: red">*</span></label
                >
                <Field
                  v-model="formData.email"
                  name="email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email..."
                />
                <ErrorMessage name="email" class="text-danger" />
              </div>
              <div class="mb-3">
                <Dropdown
                  @selectZone="handleTimeZone"
                  id="location"
                  :name="'location'"
                  :label="'Location'"
                ></Dropdown>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label custom-form-label"
                  >Password<span style="color: red">*</span></label
                >
                <Field
                  v-model="formData.password"
                  name="password"
                  type="password"
                  class="form-control"
                  id="password"
                  autocomplete="on"
                  placeholder="Enter password..."
                />
                <ErrorMessage name="password" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="repeatPassword" class="form-label custom-form-label"
                  >Repeat password<span style="color: red">*</span></label
                >
                <Field
                  v-model="formData.repeatPassword"
                  name="repeatPassword"
                  type="password"
                  class="form-control"
                  id="repeatPassword"
                  autocomplete="on"
                  placeholder="Repeat the password..."
                />
                <ErrorMessage name="repeatPassword" class="text-danger" />
              </div>
              <div class="mb-3 text-center">
                <button
                  type="submit"
                  class="btn custom-btn"
                  btn-style="default-button-small"
                >
                  Register
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import userServices from '@/services/users/userServices.js';
import { Field, Form, ErrorMessage } from 'vee-validate';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { ref } from 'vue';

const validation = yup.object({
  username: yup
    .string()
    .required('Username is required!')
    .min(3, 'Username must be at least 3 characters!'),
  email: yup
    .string()
    .required('Email is required!')
    .email('Invalid email format!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(6, 'Password must be at least 6 characters!'),
  repeatPassword: yup
    .string()
    .required('Repeat password is required!')
    .oneOf([yup.ref('password')], 'Passwords must match!'),
});

const router = useRouter();

const formData = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const location = ref('');

const handleTimeZone = (selectedZone) => {
  location.value = selectedZone;
};

const onSubmit = async () => {
  console.log('here');
  try {
    if (formData.password !== formData.repeatPassword) {
      throw new Error('Passwords do not match!');
    }

    await userServices.signUp(
      {
        email: formData.email,
        username: formData.username,
        location: location.value,
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

<style scoped lang="scss">
@import '@/styles/variables.scss';

.custom-card {
  background-color: $lighter-gray;

  .custom-card-header {
    background-color: $dark-gray;
    color: $classic-cream;
  }

  .custom-btn {
    background-color: $elegant-gold;
    border: none;
  }

  .custom-form-label {
    color: $classic-cream;
  }
}
</style>
