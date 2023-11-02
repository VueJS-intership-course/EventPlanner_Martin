<template>
  <div v-if="!event" class="text-center mt-5">
    <span>Loading...</span>
  </div>
  <div v-if="event" class="container d-flex mt-4 w-50">
    <div class="container mt-4">
      <div class="d-flex justify-content-center">
        <div class="card" style="width: 18rem">
          <img
            src="https://picsum.photos/600/400"
            alt="Event Image"
            class="img-fluid rounded"
          />
          <div class="card-body">
            <h5 class="card-title">Event: {{ event.name }}</h5>
            <p class="card-text">Decription: {{ event.description }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Date and time: {{ event.date }} {{ event.time }}
            </li>
            <li class="list-group-item">Price: ${{ event.price }}</li>
            <li class="list-group-item">
              Available tickets: {{ event.ticket }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <MapComponent :location="event.location" style="height: 300px; width: 500px"></MapComponent>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { eventStore } from '@/store/eventStore.js';
import { useRoute } from 'vue-router';
import MapComponent from '../../common-templates/MapComponent.vue';

const route = useRoute();
const eStore = eventStore();
const eventId = computed(() => route.params.id);

eStore.getEventDetails(eventId.value);
const event = computed(() => eStore.choosedEvent);
</script>
