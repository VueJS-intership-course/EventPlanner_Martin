<!-- <template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card custom-card">
          <div class="card-header custom-card-header">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <Form @submit="onSubmit" :validationSchema="validation">
              <div class="mb-4">
                <label for="username" class="form-label custom-form-label"
                  >Username<span class="text-danger">*</span></label
                >
                <Field
                  v-model="formData.username"
                  type="username"
                  name="username"
                  class="form-control"
                  id="username"
                  placeholder="Enter username..."
                />
                <ErrorMessage name="username" class="text-danger position-absolute" />
              </div>
              <div class="mb-4">
                <label for="email" class="form-label custom-form-label"
                  >Email<span class="text-danger">*</span></label
                >
                <Field
                  v-model="formData.email"
                  name="email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email..."
                />
                <ErrorMessage name="email" class="text-danger position-absolute" />
              </div>
              <div class="mb-4">
                <Dropdown
                  @selectZone="handleTimeZone"
                  id="location"
                  :name="'location'"
                  :label="'Location'"
                ></Dropdown>
              </div>
              <div class="mb-4">
                <label for="password" class="form-label custom-form-label"
                  >Password<span class="text-danger">*</span></label
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
                <ErrorMessage name="password" class="text-danger position-absolute" />
              </div>
              <div class="mb-4">
                <label for="repeatPassword" class="form-label custom-form-label"
                  >Repeat password<span class="text-danger">*</span></label
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
                <ErrorMessage name="repeatPassword" class="text-danger position-absolute" />
              </div>
              <div class="text-center">
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
</template> -->
<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card custom-card">
          <div class="card-header custom-card-header">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <div v-if="registerError" class="alert alert-danger">
              {{ registerError }}
            </div>
            <Form @submit="onSubmit" :validationSchema="validation">
              <div class="mb-4">
                <CustomInput
                  label="Username"
                  name="username"
                  type="text"
                  field-id="username"
                  placeholder-value="Enter username..."
                  is-required
                  v-model="formData.username"
                />
              </div>
              <div class="mb-4">
                <CustomInput
                  label="Email"
                  name="email"
                  type="text"
                  field-id="email"
                  placeholder-value="Enter email..."
                  is-required
                  v-model="formData.email"
                />
              </div>
              <div class="mb-4">
                <Dropdown
                  @selectZone="handleTimeZone"
                  id="location"
                  :name="'location'"
                  :label="'Location'"
                ></Dropdown>
              </div>
              <div class="mb-4">
                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  field-id="password"
                  placeholder-value="Enter password..."
                  is-required
                  v-model="formData.password"
                />
              </div>
              <div class="mb-4">
                <CustomInput
                  label="Repeat password"
                  name="repeatPassword"
                  type="password"
                  field-id="repeatPassword"
                  placeholder-value="Repeat the password..."
                  is-required
                  v-model="formData.repeatPassword"
                />
              </div>
              <div class="text-center">
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
import { Form } from 'vee-validate';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { reactive, ref } from 'vue';
import { minPasswordLength } from '@/utils/constants.js';
import { minUsernameLength } from '@/utils/constants.js';
import CustomInput from '@/components/Custom-Input/CustomInput.vue';
import showNotification from '@/utils/notifications/showNotification.js'

const validation = yup.object({
  username: yup
    .string()
    .required('Username is required!')
    .min(
      minUsernameLength,
      `Username must be at least ${minUsernameLength} characters!`
    ),
  email: yup
    .string()
    .required('Email is required!')
    .email('Invalid email format!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(
      minPasswordLength,
      `Password must be at least ${minPasswordLength} characters!`
    ),
  repeatPassword: yup
    .string()
    .required('Repeat password is required!')
    .oneOf([yup.ref('password')], 'Passwords must match!'),
});

const router = useRouter();
const registerError = ref('');

const formData = reactive({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
});

const location = ref('');

const handleTimeZone = (selectedZone) => {
  location.value = selectedZone;
};

const onSubmit = async () => {
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

    router.push({ name: 'events' });
  } catch (error) {
    registerError.value = error;
    showNotification(error.message, 5000)
  }
};
</script>

<style scoped lang="scss">
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

  // .custom-form-label {
  //   color: $classic-cream;
  // }
}
</style>
