<template>
  <div>
    <RouterLink v-if="isAdmin" :to="'/events/createEvent'">
      <button class="btn btn-primary">Create Event</button>
    </RouterLink>
    <div class="container mt-5">
      <div class="d-flex event-list justify-content-center">
        <div class="col-3" v-for="(event, index) in events" :key="index">
          <div class="card mb-2">
            <div class="card-body">
              <h5 class="card-title">{{ event.name }}</h5>
              <p class="card-text">Description: {{ event.description }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Date and time:</strong> {{ event.date }} {{ event.time }}</li>
              <li class="list-group-item"><strong>Location:</strong> {{ event.location }}</li>
              <li class="list-group-item"><strong>Price:</strong> {{ event.price }}</li>
              <li class="list-group-item"><strong>Tickets Available:</strong> {{ event.ticket }}</li>
            </ul>
            <div class="card-body">
              <button class="btn btn-primary">Buy Tickets</button>
              <button @click="eventDetails(event.id)">Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { eventStore } from '@/store/eventStore';
import {computed} from 'vue';
import {userStore} from '@/store/userStore.js'
import { useRouter } from 'vue-router';

const eStore = eventStore();
const uStore = userStore();
const router = useRouter();

const isAdmin = computed(() => uStore.isAdmin);

eStore.getEvents();
const events = computed(() => eStore.events);
console.log(events);

const eventDetails = (eventId) => {
  router.push({name: 'event', params: {id: eventId}})
}
</script>

<style scoped>
.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: 600;
  font-size: 1.25rem;
}

.card-text {
  margin-top: 10px;
}
</style>
