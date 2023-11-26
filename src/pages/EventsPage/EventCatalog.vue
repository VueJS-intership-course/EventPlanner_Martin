<template>
  <div v-if="filteredEvents">
    <div v-if="isAdmin" class="mt-3">
      <div class="d-flex justify-content-center">
        <div v-if="!isToggleFilters" class="text-center my-3 me-3">
          <button class="btn btn-filter btn-lg" @click="toggleFilters">
            Filters
          </button>
        </div>
        <div class="text-center my-3 ms-3">
          <RouterLink :to="'/events/createEvent'">
            <button class="btn btn-create-event btn-lg">
              Create New Event
            </button>
          </RouterLink>
        </div>
      </div>
      <EventFilter v-if="isToggleFilters"></EventFilter>
    </div>
    <div v-if="!isAdmin" class="text-center mt-3">
      <button
        v-if="!isToggleFilters"
        class="btn btn-filter btn-lg"
        @click="toggleFilters"
      >
        Filters
      </button>
      <EventFilter v-if="isToggleFilters"></EventFilter>
    </div>
    <div class="container mt-3">
      <div class="row row-cols-md-4 g-5">
        <div
          v-for="(event, index) in filteredEvents"
          :key="index"
          class="col d-flex align-items-stretch"
          @click="eventDetails(event.id)"
        >
        <div class="position-relative card larger-card shadow bg-white rounded">
          <span
            v-if="hasEnded(event.time)"
            class="expired-badge"
            >Expired</span
          >
          <div class="position-relative image-container">
            <img
            :src="event.imageUrl"
            class="card-img-top"
            alt="Event Image"
            />
            <h5 class="card-title-overlay text-white position-absolute p-2">
              {{ event.name }}
            </h5>
          </div>
          <div class="card-body">
              <p class="card-text">
                <i
                  class="bi bi-ticket-detailed align-middle"
                  :class="{
                    'text-danger': event.ticket < 20,
                    'text-warning': event.ticket >= 20 && event.ticket < 50,
                    'text-success': event.ticket >= 50,
                  }"
                ></i>
                <span
                  :class="{
                    'text-danger': event.ticket < 20,
                    'text-warning': event.ticket >= 20 && event.ticket < 50,
                    'text-success': event.ticket >= 50,
                  }"
                  class="ms-2 align-middle fw-bold"
                >
                  Tickets Available: {{ formatedTicketCount(event.ticket) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="filteredEvents.length === 0" class="mt-5">
        <div class="text-center">
          <i
            class="bi bi-calendar-x-fill mb-3"
            style="font-size: 4rem; color: #6c757d"
          ></i>
          <h3>No Events Found</h3>
          <p class="lead">
            Try adjusting your filters or come back later to find more events.
          </p>
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
import EventFilter from '@/pages/EventsPage/EventFilter.vue';

const eStore = eventStore();
const uStore = userStore();
const router = useRouter();

const isAdmin = computed(() => uStore.isAdmin);
const isToggleFilters = computed(() => eStore.isToggleFilters);
const filteredEvents = computed(() => {
  return eStore.filteredEvents;
});

const hasEnded = (time) => {
  return new Date(time) < new Date()
}

const toggleFilters = () => {
  eStore.isToggleFilters = !eStore.isToggleFilters;
};

eStore.getEvents();

const eventDetails = (eventId) => {
  router.push({ name: 'event', params: { id: eventId } });
};

const formatedTicketCount = computed(() => {
  return (tickets) => {
    if (tickets > 1000) {
      return `${Math.floor(tickets / 1000)}K`;
    }
    return tickets;
  };
});
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.btn-create-event {
  background-color: $medium-spring-green;
  color: $dark-gray;
  font-weight: bold;

  &:hover {
    background-color: #00d26e;
    color: $classic-cream;
  }
}

.btn-filter {
  background-color: $blue-cola;
  color: $dark-gray;
  font-weight: bold;

  &:hover {
    background-color: #00537c;
    color: $classic-cream;
  }
}
.bi-ticket-detailed {
  font-size: 1.5rem;
}

.larger-card {
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.larger-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-title-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 1.2rem;
  margin-top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-shadow: 1px 1px 2px black;
  padding: 0.5rem;
}

.card {
  border: none;
}

.expired-badge {
    position: absolute;
    top: 80px;
    right: -20px;
    z-index: 10;
    overflow: hidden;
    background-color: $candy-apple-red;
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    transform: translateY(-50%) rotate(45deg);
    transform-origin: top right;
    width: 120px;
    text-align: center;
  }
</style>
