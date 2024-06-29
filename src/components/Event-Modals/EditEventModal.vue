<template>
  <CustomModal modal-title="Edit Event" @closeModal="cancelButton">
    <Form
      @submit="saveEditedEvent"
      :validation-schema="validationSchema"
      class="custom-form"
    >
      <div class="modal-body">
        <div class="d-flex">
          <div class="form-group w-100 me-5">
            <CustomInput
              :fieldAttrs="{
                type: 'text',
                id: 'name',
                placeholder: 'Type name...',
              }"
              label="Name"
              name="name"
              is-required
              v-model="editedEvent.name"
            />
          </div>
          <div class="form-group w-100 ms-5">
            <CustomInput
              :fieldAttrs="{
                type: 'text',
                id: 'description',
                placeholder: 'Type description...',
              }"
              label="Description"
              name="description"
              is-required
              v-model="editedEvent.description"
            />
          </div>
        </div>
        <div class="d-flex">
          <div class="form-group w-100 me-5">
            <CustomInput
              :fieldAttrs="{
                type: 'number',
                id: 'tickets',
                placeholder: 'Type count of tickets...',
              }"
              label="Tickets"
              name="tickets"
              is-required
              v-model="editedEvent.ticket"
            />
          </div>
          <div class="form-group w-100 ms-5">
            <CustomInput
              :fieldAttrs="{
                type: 'number',
                id: 'price',
                placeholder: 'Type price...',
              }"
              label="Price"
              name="price"
              is-required
              v-model="editedEvent.price"
            />
          </div>
        </div>
        <div class="d-flex">
          <div class="form-group w-100 me-5">
            <CustomInput
            :fieldAttrs="{
                type: 'date',
                id: 'date',
              }"
              label="Date"
              name="date"
              is-required
              v-model="editedEvent.date"
            />
          </div>

          <div class="form-group w-100 ms-5">
            <CustomInput
            :fieldAttrs="{
                type: 'time',
                id: 'time',
              }"
              label="Time"
              name="time"
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
        <button type="submit" class="btn btn-save mb-5">
          <i class="bi bi-floppy"></i>
          Save
        </button>
      </div>
    </Form>
  </CustomModal>
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
import CustomModal from '@/components/Custom-Modal/CustomModal.vue';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1); // see moment js way

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
};

const saveEditedEvent = async () => {
  editedEvent.value.address = await getAddressFromCoordinates(
    editedEvent.value.location
  );
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
.custom-form {
  background-color: $lighter-gray;
}
.btn-save {
  background-color: $blue-cola;
  color: $classic-cream;

  &:hover {
    background-color: #00537c;
  }
}
</style>
