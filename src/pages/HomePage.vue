<template>
  <div>
    <MapChart :eventsCount="eventsCount"></MapChart>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import MapChart from '@/components/Charts/MapChart.vue';
import { eventStore } from '../store/eventStore.js';
import { getCountry } from '@/utils/getCountry.js';

const eStore = eventStore();
const events = ref([]);
const eventsCount = ref({});
console.log(eventsCount);
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