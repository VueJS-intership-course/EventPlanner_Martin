<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card custom-card">
          <div class="card-header custom-card-header">
            <h1>Login</h1>
          </div>
          <div class="card-body">
            <Form @submit="onSumbit" :validationSchema="schema">
              <div class="mb-3 ms-1">
                <!-- create common component for input fields that holds input and error message components -->
                <label for="email" class="form-label custom-form-label"
                  >Email
                  <!-- separate colored text in class name -->
                  <span style="color: red">*</span></label
                >
                <Field
                  type="email"
                  v-model="loginData.email"
                  name="email"
                  id="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                />
                <ErrorMessage name="email" class="text-danger" />
                <!-- -->
              </div>
              <div class="mb-3 ms-1">
                <label for="password" class="form-label custom-form-label"
                  >Password<span style="color: red">*</span></label
                >
                <Field
                  type="password"
                  v-model="loginData.password"
                  name="password"
                  id="password"
                  class="form-control"
                  placeholder="Enter your password"
                  required
                  autocomplete="on"
                />
                <ErrorMessage name="password" class="text-danger" />
              </div>
              <div class="mb-3 ms-1">
                <div>
                  <span class="mb-2 label">
                    Don't have an account?
                    <RouterLink :to="'/register'" class="btn-signup"
                      >Sign Up</RouterLink
                    >
                  </span>
                </div>
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn custom-btn"
                    btn-style="default-button-small"
                  >
                    Login
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import userServices from '@/services/users/userServices';
import { useRouter } from 'vue-router';

const router = useRouter();

const schema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email!')
    .required('This field is required!'),

    // make check for length the same as register page, otherwise user will never log in
  password: yup
    .string()
    .min(6, 'Password must be at least 8 symbols!')
    .required('This field is required!'),
});

// define with reactive prop
const loginData = {
  email: '',
  password: '',
};

const onSumbit = async () => {
  try {
    await userServices.signIn(loginData.email, loginData.password);
    router.push({ name: 'events' });
  } catch (error) {
    // show popup error message for wrong credentials
    console.log(error);
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

  .label {
    color: $classic-cream;
  }

  .custom-form-label {
    color: $classic-cream;
  }

  .custom-btn {
    background-color: $elegant-gold;
    border: none;
  }

  .btn-signup {
    color: $elegant-gold;
  }
}
</style>
