<template>
    <div class="d-flex align-items-center justify-content-center container">
            <div class="text-center row">
                <div class=" col-md-6">
                    <img src="../utils/images/Not Found.png" alt=""
                        class="img-fluid">
                </div>
                <div class=" col-md-6 mt-5">
                    <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                    <p class="lead">
                        The page you're looking for doesn't exist.
                    </p>
                    <RouterLink :to="'/events'">
                        <button class="btn btn-home">Go Home</button>
                    </RouterLink>
                </div>
            </div>
        </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.container {
    height: calc(100vh - 91px);

    .btn-home {
        background-color: $blue-cola;
        color: $dark-gray;
        font-weight: bold;

        &:hover {
            background-color: #00537c;
            color: $classic-cream;
        }
    }
}
</style>