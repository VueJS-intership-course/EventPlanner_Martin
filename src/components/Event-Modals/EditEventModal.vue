<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content custom-modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title" id="edit">Edit Event</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="cancelButton"
          ></button>
        </div>
        <Form
          @submit="saveEditedEvent"
          :validation-schema="validationSchema"
          class="custom-form"
        >
          <div class="modal-body">
            <div class="d-flex">
              <div class="form-group w-100 me-5">
                <CustomInput
                  label="Name"
                  name="name"
                  type="text"
                  field-type="name"
                  placeholder-value="Type name..."
                  is-required
                  v-model="editedEvent.name"
                />
              </div>
              <div class="form-group w-100 ms-5">
                <CustomInput
                  label="Description"
                  name="description"
                  type="text"
                  field-type="description"
                  placeholder-value="Type description..."
                  is-required
                  v-model="editedEvent.description"
                />
              </div>
            </div>
            <div class="d-flex">
              <div class="form-group w-100 me-5">
                <CustomInput
                  label="Tickets"
                  name="tickets"
                  type="number"
                  field-type="tickets"
                  placeholder-value="Type count of tickets..."
                  is-required
                  v-model="editedEvent.ticket"
                />
              </div>
              <div class="form-group w-100 ms-5">
                <CustomInput
                  label="Price"
                  name="price"
                  type="number"
                  field-type="price"
                  placeholder-value="Type price..."
                  is-required
                  v-model="editedEvent.price"
                />
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="form-group w-100 me-5">
                <CustomInput
                  label="Date"
                  name="date"
                  type="date"
                  field-type="date"
                  is-required
                  v-model="editedEvent.date"
                />
              </div>

              <div class="form-group w-100 ms-5">
                <CustomInput
                  label="Time"
                  name="time"
                  type="time"
                  field-type="time"
                  is-required
                  v-model="editedEvent.time"
                />
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

<script setup>
import { computed, watch } from 'vue';
import { eventStore } from '@/store/eventStore.js';
import { useRouter } from 'vue-router';
import { getAddressFromCoordinates } from '@/utils/getAddressFromCoordinates.js';
import { getTimeZone } from '@/utils/getTimeZone.js';
import moment from 'moment-timezone';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import MapComponent from '@/components/Map/MapComponent.vue';
import CustomInput from '@/components/Custom-Input/CustomInput.vue';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const validationSchema = yup.object({
  name: yup.string().required('This field is required!'),
  description: yup.string().required('This field is required!'),
  tickets: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Type positive number!')
    .required('This field is required!'),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Type positive number!')
    .required('This field is required!'),
  date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(yesterday, 'You can not select past date!'),
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

  // editedEvent.value.address = await getAddressFromCoordinates(coordinates);
  // console.log(editedEvent.value.address);
};

const saveEditedEvent = async () => {
  editedEvent.value.address = await getAddressFromCoordinates(editedEvent.value.location);
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
.custom-modal-content {
  border: none;
}
.custom-form {
  background-color: $lighter-gray;
}

.custom-modal-header {
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

.label {
  color: $classic-cream;
}
</style>