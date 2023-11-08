<template>
  <div>
    <div v-if="isAdmin" class="text-center my-3">
      <RouterLink :to="'/events/createEvent'">
        <button class="btn btn-primary btn-lg">Create Event</button>
      </RouterLink>
    </div>
    <div class="container mt-3">
      <div
        class="row row-cols-1 row-cols-md-3 g-4 w-100 d-flex justify-content-center"
      >
        <div
          class="col d-flex justify-content-center align-items-stretch mb-4"
          v-for="(event, index) in events"
          :key="index"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-primary text-white">
              <h5 class="card-title mb-0">{{ event.name }}</h5>
            </div>
            <img
              src="https://picsum.photos/600/400"
              alt="Event Image"
              class="card-img-top"
              style="object-fit: cover; height: 200px"
            />
            <div class="card-body">
              <p class="card-text">{{ event.description }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item list-group-item-secondary px-4 py-2">
                <i class="bi bi-calendar2 text-primary"></i>
                <strong class="ms-1">Date and time:</strong> {{ event.date }}
                {{ event.time }}
              </li>
              <li class="list-group-item px-4 py-2">
                <i class="bi bi-geo-alt text-primary"></i>
                <strong class="ms-1">Location:</strong>
                {{ event.location }}
              </li>
              <li class="list-group-item list-group-item-success px-4 py-2">
                <i class="bi bi-coin text-success"></i>
                <strong class="ms-1">Price:</strong> {{ event.price }}
              </li>
              <li
                class="list-group-item px-4 py-2"
                :class="{
                  'list-group-item-danger': event.ticket < 10,
                  'list-group-item-warning':
                    event.ticket >= 10 && event.ticket < 20,
                }"
              >
                <i
                  class="bi bi-ticket-detailed text-primary"
                  :class="{
                    'text-danger': event.ticket < 10,
                    'text-warning': event.ticket >= 10 && event.ticket < 20,
                  }"
                ></i>
                <strong class="ms-1">Tickets Available:</strong>
                {{ event.ticket }}
              </li>
            </ul>

            <div class="card-footer bg-white d-flex justify-content-between">
              <button
              v-if="!isAdmin && !event.clients.includes(userEmail)"
                class="btn btn-success"
                @click="handleBuyTicket(event)"
              >
                <i class="bi bi-bookmark-dash"></i> Buy Tickets
              </button>
              <button
                class="btn btn-outline-primary ms-2"
                @click="eventDetails(event.id)"
              >
                <i class="bi bi-info-circle-fill"></i>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { eventStore } from '@/store/eventStore';
import { computed } from 'vue';
import { userStore } from '@/store/userStore.js';
import { useRouter } from 'vue-router';

const eStore = eventStore();
const uStore = userStore();
const router = useRouter();

const isAdmin = computed(() => uStore.isAdmin);
const userEmail = computed(() => uStore.currentUser ? uStore.currentUser.email : null);

eStore.getEvents();
const events = computed(() => eStore.events);
console.log(events);

const eventDetails = (eventId) => {
  router.push({ name: 'event', params: { id: eventId } });
};

const handleBuyTicket = (event) => {
  eStore.buyTicket(event);
};

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
