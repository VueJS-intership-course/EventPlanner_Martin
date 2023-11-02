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
          <span>hi there</span>
          <MapComponent></MapComponent>
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
import { computed, ref } from 'vue';
import { eventStore } from '../store/eventStore';
import { useRouter } from 'vue-router';
import MapComponent from './MapComponent.vue';

const router = useRouter();
const showMap = ref(false);

const eStore = eventStore();
const editedEvent = computed(() => eStore.editedEvent);

const handleCoordinates = (coordinates) => {
  // Assuming your editedEvent object has fields to store the coordinates, like latitude and longitude
  editedEvent.value.location = coordinates;
};

const saveEditedEvent = () => {
  eStore.editEvent(editedEvent.value);
  eStore.isEditing = false;
  router.push('/events');
};

const cancelButton = () => {
  eStore.isEditing = false;
};
</script>
