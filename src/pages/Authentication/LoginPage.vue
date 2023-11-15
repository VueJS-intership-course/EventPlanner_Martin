<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h1>Login</h1>
                    </div>
                    <div class="card-body">
                        <Form @submit="onSumbit" :validationSchema="schema">
                            <div class="mb-3 ms-1">
                                <label for="email" class="form-label">Email<span style="color: red;">*</span></label>
                                <Field type="email" v-model="loginData.email" name="email" id="email" class="form-control"
                                    placeholder="Enter your email" required />
                                <ErrorMessage name="email" class="text-danger" />
                            </div>
                            <div class="mb-3 ms-1">
                                <label for="password" class="form-label">Password<span style="color: red;">*</span></label>
                                <Field type="password" v-model="loginData.password" name="password" class="form-control"
                                    placeholder="Enter your password" required autocomplete="on" />
                                <ErrorMessage name="password" class="text-danger" />
                            </div>
                            <div class="mb-3 ms-1 d-flex row col-6">
                                <span class="mb-2">
                                    Don't have an account?
                                    <RouterLink :to="'/register'">Sign Up</RouterLink>
                                </span>
                                <button type="submit" class="btn btn-primary">Login</button>
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
    password: yup
        .string()
        .min(8, 'Password must be at least 8 symbols!')
        .required('This field is required!'),
});

const loginData = {
    email: '',
    password: '',
};

const onSumbit = async () => {
    try {
        await userServices.signIn(loginData.email, loginData.password);
        router.push({ name: 'events' })
    } catch (error) {
        console.log(error);
    }
}
</script>