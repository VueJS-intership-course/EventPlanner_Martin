<template>
  <div v-if="hasUpcomingEvents">
    <h2 class="text-center mt-3 mb-3">Upcoming Events</h2>
    <div class="container mt-3 mb-5">
      <div class="row row-cols-md-3 events-background">
        <div
          v-for="(event, index) in upcomingEvents"
          :key="index"
          class="col d-flex justify-content-center"
          @click="eventDetails(event.id)"
        >
          <div
            class="position-relative card larger-card shadow bg-white rounded"
          >
            <span class="hover-text">Click for Details</span>
            <span class="expired-badge">Upcoming</span>
            <div class="position-relative image-container">
              <img
                :src="event.imageUrl"
                class="card-img-top custom-image"
                alt="Event Image"
              />
              <h5
                class="card-title-overlay custom-card-title-overlay text-white position-absolute p-2"
              >
                {{ event.name }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="hasEvents">
    <MapChart :eventsCount="eventsCount"></MapChart>
  </div>
  <div v-if="!hasUpcomingEvents && !hasEvents" class="mt-5">
    <div class="text-center">
      <i
        class="bi bi-calendar-x-fill mb-3"
        style="font-size: 4rem; color: #6c757d"
      ></i>
      <h3>No Events Found</h3>
      <p class="lead">Come back later to find more events.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import MapChart from '@/components/Charts/MapChart.vue';
import { eventStore } from '@/store/eventStore.js';
import { getCountry } from '@/utils/getCountry.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const eStore = eventStore();
const events = ref([]);
const eventsCount = ref({});

const hasEvents = computed(() => events.value && events.value.length > 0);

const hasUpcomingEvents = computed(
  () => upcomingEvents.value && upcomingEvents.value.length > 0
);

const upcomingEvents = computed(() => {
  const now = new Date();
  return events.value
    .filter((event) => new Date(event.time) >= now)
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .slice(0, 3);
});


const countryEvents = async () => {
  for (const event of events.value) {
    let country = await getCountry(event.location);

    if (country === 'United States') {
      country = 'United States of America';
    }

    eventsCount.value[country] = (eventsCount.value[country] || 0) + 1;

  }
};

const eventDetails = (eventId) => {
  router.push({ name: 'event', params: { id: eventId } });
}

onMounted(async () => {
  await eStore.getEvents();
  events.value = eStore.events;
  countryEvents();
});
</script>

<style lang="scss" scoped>
.events-background {
  background-color: #00537c;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .larger-card {
    width: 80%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    border: none;
  }

  .larger-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  .larger-card:hover .hover-text {
    display: block;
  }

  .hover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-align: center;
    z-index: 20;
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
}

.custom-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.custom-card-title-overlay {
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
</style>
