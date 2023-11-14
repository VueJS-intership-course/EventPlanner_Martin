<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="edit">Edit Event</h5>
        </div>
        <div class="modal-body">
          <div class="d-flex">
            <div class="form-group w-100 mb-2 me-5">
              <label class="form-control-label" for="name">Name</label>
              <input
                v-model="editedEvent.name"
                type="text"
                class="form-control"
                id="form-group-input"
                name="name"
                placeholder="Type name..."
              />
            </div>
            <div class="form-group w-100 mb-2 ms-5">
              <label class="form-control-label" for="description"
                >Description</label
              >
              <input
                v-model="editedEvent.description"
                type="text"
                class="form-control"
                id="form-group-input"
                name="description"
                placeholder="Type description..."
              />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-100 mb-2 me-5">
              <label class="form-control-label" for="tickets">Tickets</label>
              <input
                v-model="editedEvent.ticket"
                type="number"
                class="form-control"
                id="form-group-input"
                name="tickets"
                placeholder="Type count of tickets..."
              />
            </div>
            <div class="form-group w-100 mb-2 ms-5">
              <label class="form-control-label" for="price">Price</label>
              <input
                v-model="editedEvent.price"
                type="number"
                class="form-control"
                id="form-group-input"
                name="price"
                placeholder="Type price..."
              />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-100 mb-2 me-5">
              <label class="form-control-label" for="date">Date</label>
              <input
                v-model="editedEvent.date"
                type="date"
                class="form-control"
                id="form-group-input"
                name="date"
              />
            </div>

            <div class="form-group w-100 mb-2 ms-5">
              <label class="form-control-label" for="time">Time</label>
              <input
                v-model="editedEvent.time"
                type="time"
                class="form-control"
                id="form-group-input"
                name="time"
              />
            </div>
          </div>

          <MapComponent
            class="map-container"
            @selectedLocation="handleCoordinates"
            :location="editedEvent.location"
          ></MapComponent>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="saveEditedEvent">
            <i class="bi bi-floppy"></i>
            Save
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="cancelButton"
          >
            <i class="bi bi-x-circle"></i>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { eventStore } from '../store/eventStore';
import { useRouter } from 'vue-router';
import MapComponent from './MapComponent.vue';
import { getAddressFromCoordinates } from '../utils/getAddressFromCoordinates.js';
import { getTimeZone } from '../utils/getTimeZone';
import moment from 'moment-timezone';

const emit = defineEmits();

const router = useRouter();

const eStore = eventStore();
const editedEvent = computed(() => eStore.editedEvent);

const handleCoordinates = async (coordinates) => {
  editedEvent.value.location = coordinates;

  editedEvent.value.address = await getAddressFromCoordinates(coordinates);
};


const saveEditedEvent = () => {
  editedEvent.value.timeZone = getTimeZone(editedEvent.value.location);
  const eventDateAndTime = `${editedEvent.value.date}T${editedEvent.value.time}`;
  editedEvent.value.time = moment.tz(eventDateAndTime, editedEvent.value.timeZone).utc().toISOString();

  eStore.editEvent(editedEvent.value);
  eStore.isEditing = false;
  router.push('/events');
};

const cancelButton = () => {
  eStore.isEditing = false;
};

watch(
  () => editedEvent.value.location,
  (newLocation, oldLocation) => {
    if (newLocation !== oldLocation) {
      // emit('update-location', newLocation);
      console.warn(newLocation)
      handleCoordinates(newLocation)
    }
  },
  { deep: true }
);
</script>

<style scoped>
.map-container {
  height: 300px;
}
</style>
