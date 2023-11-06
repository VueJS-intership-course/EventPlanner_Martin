<template>
  <div v-if="!event" class="text-center mt-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="event" class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-3 event-card">
          <img
            src="https://picsum.photos/600/400"
            alt="Event Image"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">{{ event.name }}</h5>
            <p class="card-text">{{ event.description }}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Date and time:
                <span class="badge bg-info text-dark">{{ event.date }} {{ event.time }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Price:
                <span class="badge bg-success">${{ event.price }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Available tickets:
                <span class="badge bg-danger">{{ event.ticket }}</span>
              </li>
            </ul>
          </div>
          <div class="card-footer bg-white d-flex justify-content-end">
            <button
              class="btn btn-primary btn-sm me-2"
              @click="editEvent"
            >
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="removeEvent"
            >
              <i class="bi bi-trash"></i> Remove
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
  <EditEventModal v-if="isEditing" :event="event.value">
    <MapComponent></MapComponent>
  </EditEventModal>
</template>

<script setup>
import { computed } from 'vue';
import { eventStore } from '@/store/eventStore.js';
import { useRoute, useRouter } from 'vue-router';
import MapComponent from '../../common-templates/MapComponent.vue';
import EditEventModal from '@/common-templates/EditEventModal.vue';

const route = useRoute();
const router = useRouter();
const eStore = eventStore();
const eventId = computed(() => route.params.id);
const isEditing = computed(() => eStore.isEditing);

eStore.getEventDetails(eventId.value);
const event = computed(() => eStore.choosedEvent);

const removeEvent = async () => {
  await eStore.removeEvent(event.value.id);
  router.push({name: 'events'})
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