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
                <CustomInput label="Email" name="email" type="text"
                  field-id="username" placeholderValue="Enter your email..." is-required
                  v-model="loginData.email"/>
              </div>
              <div class="mb-3 ms-1">
                <CustomInput label="Password" name="password" type="password"
                  field-id="password" placeholderValue="Enter your password..." is-required
                  v-model="loginData.password"/>
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
import { Form } from 'vee-validate';
import * as yup from 'yup';
import userServices from '@/services/users/userServices';
import { useRouter } from 'vue-router';
import { minPasswordLength } from '@/utils/constants.js';
import { ref, reactive } from 'vue';
import CustomInput from '@/components/Custom-Input/CustomInput.vue';
import showNotification from '@/utils/notifications/showNotification';

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
    loginError.value = error;
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
