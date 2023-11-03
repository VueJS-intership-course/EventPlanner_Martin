<template>
  <div v-if="!event" class="text-center mt-5">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-if="event" class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4 shadow-sm event-card">
          <img
            src="https://picsum.photos/600/400"
            alt="Event Image"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">Event: {{ event.name }}</h5>
            <p class="card-text">{{ event.description }}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Date and time:
                <span class="text-info">{{ event.date }} {{ event.time }}</span>
              </li>
              <li class="list-group-item">
                Price:
                <span class="font-weight-bold text-success"
                  >${{ event.price }}</span
                >
              </li>
              <li class="list-group-item">
                Available tickets:
                <span class="font-weight-bold text-danger">{{
                  event.ticket
                }}</span>
              </li>
            </ul>
          </div>
          <div class="card-footer bg-white d-flex justify-content-end">
            <button
              class="btn btn-outline-primary btn-sm me-2"
              @click="editEvent"
            >
            <i class="bi bi-pencil"></i>
              Edit
            </button>
            <button
              class="btn btn-outline-danger btn-sm ms-2"
              @click="removeEvent"
              >
              <i class="bi bi-trash3"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <MapComponent
          :location="event.location"
          class="border rounded map-container"
          :readonly="true"
        ></MapComponent>
      </div>
    </div>
  </div>
  <EditEventModal v-if="isEditing">
    <MapComponent> </MapComponent>
  </EditEventModal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { eventStore } from '@/store/eventStore.js';
import { useRoute } from 'vue-router';
import MapComponent from '../../common-templates/MapComponent.vue';
import EditEventModal from '../../common-templates/EditEventModal.vue';

const route = useRoute();
const eStore = eventStore();
const eventId = computed(() => route.params.id);
const isEditing = computed(() => eStore.isEditing);

eStore.getEventDetails(eventId.value);
const event = computed(() => eStore.choosedEvent);

const removeEvent = () => {
  console.log('remove');
};

const editEvent = () => {
  eStore.isEditing = true;
  eStore.editedEvent = { ...event.value };
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
