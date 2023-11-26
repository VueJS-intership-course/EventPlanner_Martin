<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="edit">Edit Event</h5>
          <button
            type="button"
            class="btn-close"
            @click="cancelButton"
          ></button>
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
                <ErrorMessage name="name" class="text-danger" />
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
                <ErrorMessage name="description" class="text-danger" />
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
                <ErrorMessage name="tickets" class="text-danger" />
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
                <ErrorMessage name="price" class="text-danger" />
              </div>
            </div>
            <div class="d-flex mb-3">
              <div class="form-group w-100 mb-2 me-5">
                <label class="form-control-label" for="date"
                  >Date<span style="color: red">*</span></label
                >
                <Field
                  v-model="editedEvent.date"
                  type="date"
                  class="form-control"
                  id="form-group-input"
                  name="date"
                />
                <ErrorMessage name="date" class="text-danger" />
              </div>

              <div class="form-group w-100 mb-2 ms-5">
                <label class="form-control-label" for="time"
                  >Time<span style="color: red">*</span></label
                >
                <Field
                  v-model="editedEvent.time"
                  type="time"
                  class="form-control"
                  id="form-group-input"
                  name="time"
                />
                <ErrorMessage name="time" class="text-danger" />
              </div>
            </div>

            <MapComponent
              class="map-container"
              @selectedLocation="handleCoordinates"
              :location="editedEvent.location"
            ></MapComponent>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-save mb-3">
              <i class="bi bi-floppy"></i>
              Save
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

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const validationSchema = yup.object({
  name: yup.string().required('This field is required!'),
  description: yup.string().required('This field is required!'),
  tickets: yup
    .number()
    .min(1, 'The count of tickets cannot be negative!')
    .required('This field is required!'),
  price: yup
    .number()
    .min(1, 'The price of ticket cannot be negative!')
    .required('This field is required!'),
  date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(yesterday, 'You can not select date, which is in the past!')
    .required('This field is required!'),
  time: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format!'),
});

const emit = defineEmits();

const router = useRouter();

const eStore = eventStore();
const editedEvent = computed(() => eStore.editedEvent);

const eventDateTime = computed(() => {
  const dateTime = eStore.getEventDateTime;
  return {
    date: dateTime.date,
    time: dateTime.time,
  };
});

editedEvent.value.date = eventDateTime.value.date;
editedEvent.value.time = eventDateTime.value.time;

const handleCoordinates = async (coordinates) => {
  editedEvent.value.location = coordinates;

  editedEvent.value.address = await getAddressFromCoordinates(coordinates);
};

const saveEditedEvent = () => {
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

@import '@/styles/variables.scss';
.modal-content {
  border: none;
}
form {
  background-color: $lighter-gray;
}

.modal-header {
  background-color: $dark-gray;
  color: $classic-cream;
}
.btn-save {
  background-color: $blue-cola;
  color: $classic-cream;

  &:hover {
    background-color: #00537c;
  }
}

.form-control-label {
  color: $classic-cream;
}
</style>
