<template>
    <RouterLink :to="'/events/createEvent'">
        <button>Create event</button>
    </RouterLink>
</template>

<script setup>
import { computed } from 'vue';
//TODO: CreateEvent accessible, if user is admin
</script>