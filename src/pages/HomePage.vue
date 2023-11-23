<template>
  <div v-if="hasEvents">
    <MapChart :eventsCount="eventsCount"></MapChart>
  </div>
  <div
        v-if="!hasEvents"
        class=" mt-5"
      >
        <div class="text-center">
          <i
            class="bi bi-calendar-x-fill mb-3"
            style="font-size: 4rem; color: #6c757d"
          ></i>
          <h3>No Events Found</h3>
          <p class="lead">
            Come back later to find more events.
          </p>
        </div>
      </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import MapChart from '@/components/Charts/MapChart.vue';
import { eventStore } from '../store/eventStore.js';
import { getCountry } from '@/utils/getCountry.js';

const eStore = eventStore();
const events = ref([]);
const eventsCount = ref({});

const hasEvents = computed(() => events.value && events.value.length > 0);

const countryEvents = async () => {
  for (const event of events.value) {
    let country = await getCountry(event.location);

    if (country === 'United States') {
      country = 'United States of America';
    }

    eventsCount.value[country] = (eventsCount.value[country] || 0) + 1;
  }
};


onMounted(async () => {
  await eStore.getEvents();
  events.value = eStore.events;
  countryEvents();
});
</script>