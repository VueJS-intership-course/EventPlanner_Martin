<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="edit">Edit Event</h5>
        </div>
        <Form @submit="saveEditedEvent" :validation-schema="validationSchema">
          <div class="modal-body">
            <div class="d-flex">
              <div class="form-group w-100 mb-2 me-5">
                <label class="form-control-label" for="name">Name</label>
                <Field
                  v-model="editedEvent.name"
                  type="text"
                  class="form-control"
                  id="form-group-input"
                  name="name"
                  placeholder="Type name..."
                />
                <ErrorMessage name="name"/>
              </div>
              <div class="form-group w-100 mb-2 ms-5">
                <label class="form-control-label" for="description"
                  >Description</label
                >
                <Field
                  v-model="editedEvent.description"
                  type="text"
                  class="form-control"
                  id="form-group-input"
                  name="description"
                  placeholder="Type description..."
                />
                <ErrorMessage name="description"/>
              </div>
            </div>
            <div class="d-flex">
              <div class="form-group w-100 mb-2 me-5">
                <label class="form-control-label" for="tickets">Tickets</label>
                <Field
                  v-model="editedEvent.ticket"
                  type="number"
                  class="form-control"
                  id="form-group-input"
                  name="tickets"
                  placeholder="Type count of tickets..."
                />
                <ErrorMessage name="tickets"/>
              </div>
              <div class="form-group w-100 mb-2 ms-5">
                <label class="form-control-label" for="price">Price</label>
                <Field
                  v-model="editedEvent.price"
                  type="number"
                  class="form-control"
                  id="form-group-input"
                  name="price"
                  placeholder="Type price..."
                />
                <ErrorMessage name="price"/>
              </div>
            </div>
            <div class="d-flex">
              <div class="form-group w-100 mb-2 me-5">
                <label class="form-control-label" for="date">Date</label>
                <Field
                  v-model="editedEvent.date"
                  type="date"
                  class="form-control"
                  id="form-group-input"
                  name="date"
                />
                <ErrorMessage name="date" class="text-danger"/>
              </div>

              <div class="form-group w-100 mb-2 ms-5">
                <label class="form-control-label" for="time">Time</label>
                <Field
                  v-model="editedEvent.time"
                  type="time"
                  class="form-control"
                  id="form-group-input"
                  name="time"
                />
                <ErrorMessage name="time" class="text-danger"/>
              </div>
            </div>

            <MapComponent
              class="map-container"
              @selectedLocation="handleCoordinates"
              :location="editedEvent.location"
            ></MapComponent>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">
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
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { eventStore } from '../../store/eventStore.js';
import { useRouter } from 'vue-router';
import MapComponent from '../../components/Map/MapComponent.vue';
import { getAddressFromCoordinates } from '../../utils/getAddressFromCoordinates.js';
import { getTimeZone } from '../../utils/getTimeZone.js';
import moment from 'moment-timezone';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  tickets: yup.number().positive().integer(),
  price: yup.number().positive(),
  date: yup.date().required('Date is required!'),
  time: yup.string().required('Time is required!').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
  // Add other fields as needed
});

const emit = defineEmits();

const router = useRouter();

const eStore = eventStore();
const editedEvent = computed(() => eStore.editedEvent);

const handleCoordinates = async (coordinates) => {
  editedEvent.value.location = coordinates;

  editedEvent.value.address = await getAddressFromCoordinates(coordinates);
};

const isValidDate = (date) => date && !isNaN(Date.parse(date));
const isValidTime = (time) =>
  time && time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);

const saveEditedEvent = () => {
  console.log(editedEvent.value.time);
  
  if (!isValidDate(editedEvent.value.date)) {
    alert('Please select date!');

    return;
  }

  if (!isValidTime(editedEvent.value.time)) {
    alert('Please select time!');

    return;
  }

  editedEvent.value.timeZone = getTimeZone(editedEvent.value.location);
  const eventDateAndTime = `${editedEvent.value.date}T${editedEvent.value.time}`;
  editedEvent.value.time = moment
    .tz(eventDateAndTime, editedEvent.value.timeZone)
    .utc()
    .toISOString();

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
      emit('update-location', newLocation);
      console.warn(newLocation);
      handleCoordinates(newLocation);
    }
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.map-container {
  height: 300px;
}
</style>
