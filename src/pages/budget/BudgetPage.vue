<template>
  <div v-if="event">
    <div>
      <span>Profit: </span>
    </div>
    <div>
      <span>Budget: {{ event.budget }}</span>
    </div>
  </div>
</template>

<script setup>
import { eventStore } from '../../store/eventStore';
import { computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const eStore = eventStore();
const route = useRoute();

const eventId = computed(() => route.params.id);

eStore.getEventDetails(eventId.value);

const event = computed(() => eStore.choosedEvent);

onMounted(() => {
  eStore.getEventDetails(eventId.value);
});

watch(eventId, (newId) => {
  eStore.getEventDetails(newId);
});
</script>
