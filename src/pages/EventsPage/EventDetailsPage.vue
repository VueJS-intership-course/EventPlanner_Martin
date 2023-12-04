<template>
  <div class="custom-overlay" v-if="isEditing || showDescription"></div>
  <div v-if="!event" class="text-center mt-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="event" class="text-center title mt-2">
    <h3>{{ event.name }}</h3>
  </div>
  <div v-if="event" class="container mt-4">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-3 event-card">
          <img :src="event.imageUrl" alt="Event Image" class="card-img-top" />
          <div class="card-body">
            <button class="btn btn-info btn-sm" @click="showDescriptionModal">
              View Full Description
            </button>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Date and time:
                <span class="badge badge-date text-dark">{{
                  getEventTime(event.time, event.timeZone)
                }}</span>
              </li>
              <li
                v-if="isLoggedIn"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Your time:
                <span class="badge badge-date text-dark">{{
                  getUserTime(event.time)
                }}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Price:
                <span class="badge badge-price">${{ event.price }}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Available tickets:
                <span v-if="event.ticket > 0" class="badge badge-tickets"
                  >{{ event.ticket }} left</span
                >
                <span v-if="event.ticket <= 0" class="badge badge-tickets"
                  >SOLD OUT!</span
                >
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Address:
                <span class="badge badge-address rounded ms-3">{{
                  event.address
                }}</span>
              </li>
            </ul>
          </div>
          <div
            v-if="isAdmin"
            class="card-footer bg-white d-flex justify-content-end"
          >
            <button class="btn btn-budget btn-sm" @click="viewBudget(event.id)">
              <i class="bi bi-calculator"></i> View Budget
            </button>
            <button class="btn btn-remove btn-sm ms-2" @click="removeEvent">
              <i class="bi bi-trash"></i> Remove
            </button>
            <button
              v-if="!eventHasPassed"
              class="btn btn-edit btn-sm ms-2"
              @click="editEvent"
            >
              <i class="bi bi-pencil"></i> Edit
            </button>
          </div>
          <div
            v-if="
              !isAdmin &&
              !event.clients.includes(userEmail) &&
              isLoggedIn &&
              !eventHasPassed &&
              event.ticket > 0
            "
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
            <span class="fw-bold display-6"
              >You have subscribed for that event!</span
            >
          </div>
        </div>
        <div
          v-if="
            eventHasPassed && isLoggedIn && !event.clients.includes(userEmail)
          "
        >
          <div class="alert alert-danger mt-5 text-center" role="alert">
            <span class="fw-bold display-6"
              >We apologize, but the event has passed! You can choose other
              event!</span
            >
          </div>
        </div>
        <div v-if="event.ticket < 0">
          <div class="alert alert-danger mt-5 text-center" role="alert">
            <span class="fw-bold display-6"
              >We apologize, but the tickets are sold out! You can choose other
              event!</span
            >
          </div>
        </div>
        <div
          v-if="!isAdmin && !isLoggedIn"
          class="alert alert-danger mt-5 text-center"
          role="alert"
        >
          <span class="fw-bold display-6"
            >Login or Register to buy a ticket.</span
          >
        </div>
      </div>
    </div>
  </div>
  <DescriptionModal
    v-if="showDescription"
    :style="showDescription ? 'overflow: hidden' : ''"
  ></DescriptionModal>
  <EditEventModal
    v-if="isEditing && isAdmin"
    :event="event.value"
    :style="isEditing ? 'overflow: hidden' : ''"
  />
</template>

<script setup>
import { computed } from 'vue';
import { eventStore } from '@/store/eventStore.js';
import { useRoute, useRouter } from 'vue-router';
import MapComponent from '@/components/Map/MapComponent.vue';
import EditEventModal from '@/components/Event-Modals/EditEventModal.vue';
import { userStore } from '@/store/userStore.js';
import { getUserTime } from '@/utils/getUserTime.js';
import { getEventTime } from '@/utils/getEventTime.js';
import DescriptionModal from '@/components/Event-Modals/DescriptionModal.vue';

const route = useRoute();
const router = useRouter();
const uStore = userStore();
const eStore = eventStore();

const eventId = computed(() => route.params.id);
const isEditing = computed(() => eStore.isEditing);
const showDescription = computed(() => eStore.showDescription);
const isAdmin = computed(() => uStore.isAdmin);
const isLoggedIn = computed(() => uStore.isLoggedIn);

const eventHasPassed = computed(() => {
  return event.value && new Date(event.value.time) < new Date();
});

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
  eStore.editedEvent = { ...event.value };
  eStore.isEditing = true;
};

const handleBuyTicket = () => {
  eStore.buyTicket(event.value);

  router.push({ name: 'profile' });
};

const viewBudget = (eventId) => {
  router.push({ name: 'event-budget', params: { id: eventId } });
};

const showDescriptionModal = () => {
  eStore.showDescription = true;
};
</script>

<style scoped lang="scss">
.title {
  color: $lighter-gray;
}

.event-card {
  transition: transform 0.2s;
  border: none;

  &:hover {
    transform: translateY(-5px);
  }

  .badge-tickets {
    background-color: $vibrant-coral;
    color: $dark-gray;
  }

  .badge-price {
    background-color: $soft-mint;
    color: $dark-gray;
  }

  .badge-date {
    background-color: $vibrant-teal;
    color: $dark-gray;
  }

  .badge-address {
    background-color: $vibrant-coral;
    color: $dark-gray;
    white-space: normal;
  }

  .btn-remove {
    background-color: $candy-apple-red;
    font-weight: bold;
  }

  .btn-budget {
    background-color: $medium-spring-green;
    font-weight: bold;
  }
  .btn-edit {
    background-color: $vibrant-teal;
    font-weight: bold;
  }
}

.map-container {
  height: 25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.custom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 10;
}
</style>
