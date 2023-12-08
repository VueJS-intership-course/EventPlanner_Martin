<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card custom-card">
          <div class="card-header custom-card-header">
            <h1>Login</h1>
          </div>
          <div class="card-body">
            <div v-if="loginError" class="alert alert-danger">
              {{ loginError }}
            </div>
            <Form @submit="onSumbit" :validationSchema="schema">
              <div class="mb-3 ms-1">
                <label for="email" class="form-label custom-form-label"
                  >Email<span class="text-danger">*</span></label
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
              </div>
              <div class="mb-3 ms-1">
                <label for="password" class="form-label custom-form-label"
                  >Password<span class="text-danger">*</span></label
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
import { minPasswordLength } from '@/utils/constants.js';
import { ref, reactive } from 'vue';

const router = useRouter();

const schema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email!')
    .required('This field is required!'),
  password: yup
    .string()
    .min(
      minPasswordLength,
      `Password must be at least ${minPasswordLength} characters!`
    )
    .required('This field is required!'),
});

const loginError = ref('');

const loginData = reactive({
  email: '',
  password: '',
});

const onSumbit = async () => {
  try {
    await userServices.signIn(loginData.email, loginData.password);
    router.push({ name: 'events' });
  } catch (error) {
    console.log(error);
    loginError.value = error;
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
