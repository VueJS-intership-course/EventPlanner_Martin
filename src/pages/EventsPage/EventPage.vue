<template>
  <div v-if="!event" class="text-center mt-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="event" class="text-center text-white mt-2">
    <h3>{{ event.name }}</h3>
  </div>
  <div v-if="event" class="container mt-4">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-3 event-card">
          <img :src="event.imageUrl" alt="Event Image" class="card-img-top" />
          <div class="card-body">
            <p class="card-text ms-3">Description: {{ event.description }}</p>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Date and time:
                <span class="badge bg-info text-dark"
                  >{{ getEventTime(event.time, event.timeZone) }}</span
                >
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Your time:
                <span class="badge bg-info text-dark">{{ getUserTime(event.time) }}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Price:
                <span class="badge bg-success">${{ event.price }}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Available tickets:
                <span class="badge bg-danger">{{ event.ticket }}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Address:
                <span class="badge bg-danger rounded">{{ event.address }}</span>
              </li>
            </ul>
          </div>
          <div
            v-if="isAdmin"
            class="card-footer bg-white d-flex justify-content-end"
          >
            <button class="btn btn-danger btn-sm" @click="removeEvent">
              <i class="bi bi-trash"></i> Remove
            </button>
            <button class="btn btn-primary btn-sm ms-2" @click="editEvent">
              <i class="bi bi-pencil"></i> Edit
            </button>
          </div>
          <div
            v-if="!isAdmin && !event.clients.includes(userEmail) && isLoggedIn"
            class="card-footer bg-white d-flex justify-content-end"
          >
            <button
              class="btn btn-success btn-sm fw-bold"
              @click="handleBuyTicket"
            >
              <i class="bi bi-bookmark-dash"></i> Buy Ticket
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <MapComponent
          :key="currentLocation"
          :location="currentLocation"
          class="border rounded map-container"
          :readonly="true"
        ></MapComponent>
        <div v-if="event.clients.includes(userEmail) && isLoggedIn">
          <div class="alert alert-success mt-5 text-center" role="alert">
            <span class="fw-bold" style="font-size: 1.5rem;">You have subscribed for that event!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EditEventModal v-if="isEditing && isAdmin" :event="event.value" />
</template>

<script setup>
import { computed } from 'vue';
import { eventStore } from '@/store/eventStore.js';
import { useRoute, useRouter } from 'vue-router';
import MapComponent from '@/common-templates/MapComponent.vue';
import EditEventModal from '@/common-templates/EditEventModal.vue';
import { userStore } from '../../store/userStore.js';
import { getUserTime } from '../../utils/getUserTime.js';
import {getEventTime} from '../../utils/getEventTime.js'

const route = useRoute();
const router = useRouter();
const uStore = userStore();
const eStore = eventStore();

const eventId = computed(() => route.params.id);
const isEditing = computed(() => eStore.isEditing);
const isAdmin = computed(() => uStore.isAdmin);
const isLoggedIn = computed(() => uStore.isLogged);

eStore.getEventDetails(eventId.value);
const event = computed(() => eStore.choosedEvent);
const currentLocation = computed(() => eStore.getCoordinates);
const userEmail = computed(() =>
  uStore.currentUser ? uStore.currentUser.email : null
);

const removeEvent = async () => {
  await eStore.removeEvent(event.value.id);
  router.push({ name: 'events' });
};

const editEvent = () => {
  eStore.isEditing = true;
  eStore.editedEvent = { ...event.value };
};

const handleBuyTicket = () => {
  eStore.buyTicket(event.value);

  router.push({ name: 'profile' });
};
</script>

<style scoped>
.event-card {
  transition: transform 0.2s;
}

.event-card:hover {
  transform: scale(1.05);
}

.map-container {
  height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
