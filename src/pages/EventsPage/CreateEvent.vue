<template>
  <div class="container py-4 d-flex flex-column">
    <div class="card custom-card shadow align-self-center rounded-3 col-lg-8">
      <div class="card-header custom-card-header p-3 h4">Create Event</div>
      <div
        class="card-body d-flex justify-content-center align-self-center w-100"
      >
        <Form
          @submit="handleCreateEvent"
          :validationSchema="schema"
          role="form"
          class="d-flex flex-column column w-100"
        >
          <div class="d-flex">
            <div class="form-group w-100 mb-4 me-5">
              <label class="form-control-label custom-form-control-label" for="name"
                >Name<span style="color: red">*</span></label
              >
              <Field
                type="text"
                class="form-control"
                id="name"
                name="name"
                ref="eventName"
                placeholder="Type name..."
              />
              <ErrorMessage name="name" class="text-danger position-absolute" />
            </div>
            <div class="form-group w-100 mb-4 ms-5">
              <label class="form-control-label custom-form-control-label" for="description"
                >Description<span style="color: red">*</span></label
              >
              <Field
                type="text"
                class="form-control"
                id="description"
                name="description"
                placeholder="Type description..."
              />
              <ErrorMessage name="description" class="text-danger position-absolute" />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-100 mb-4 me-5">
              <label class="form-control-label custom-form-control-label" for="tickets"
                >Tickets<span style="color: red">*</span></label
              >
              <Field
                type="number"
                class="form-control"
                id="tickets"
                name="tickets"
                placeholder="Type count of tickets..."
              />
              <ErrorMessage name="tickets" class="text-danger position-absolute" />
            </div>
            <div class="form-group w-100 mb-4 ms-5">
              <label class="form-control-label custom-form-control-label" for="price"
                >Price<span style="color: red">*</span></label
              >
              <Field
                type="number"
                class="form-control"
                id="price"
                name="price"
                placeholder="Type price..."
              />
              <ErrorMessage name="price" class="text-danger position-absolute" />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-100 mb-4 me-5">
              <label class="form-control-label custom-form-control-label" for="date"
                >Date<span style="color: red">*</span></label
              >
              <Field
                type="date"
                class="form-control"
                id="date"
                name="date"
                :value="today"
              />
              <ErrorMessage name="date" class="text-danger position-absolute" />
            </div>
            <div class="form-group w-100 mb-4 ms-5">
              <label class="form-control-label custom-form-control-label" for="time"
                >Time<span style="color: red">*</span></label
              >
              <Field
                type="time"
                class="form-control"
                id="time"
                name="time"
                :value="currentTime"
              />
              <ErrorMessage name="time" class="text-danger position-absolute" />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-50 mb-4 me-5">
              <label class="form-control-label custom-form-control-label" for="budget"
                >Budget<span style="color: red">*</span></label
              >
              <Field
                type="number"
                class="form-control"
                id="budget"
                name="budget"
                placeholder="Type budget..."
              />
              <ErrorMessage name="budget" class="text-danger position-absolute" />
            </div>
            <div class="form-group w-50 mb-4 ms-5">
              <label class="form-control-label custom-form-control-label" for="imageFile">
                Upload Image<span style="color: red">*</span>
              </label>
              <input
                type="file"
                class="form-control"
                id="imageFile"
                ref="imageFile"
                @change="handleFileUpload"
              />
              <p v-if="errorMsgImage" class="text-danger position-absolute">
                {{ errorMsgImage }}
              </p>
            </div>
          </div>
          <div class="d-flex flex-column align-self-center w-100">
            <div class="d-flex justify-content-center">
              <label class="form-control-label custom-form-control-label mb-2" for="location"
                >Choose location<span style="color: red">*</span></label
              >
              <p v-if="errorMsg" class="text-danger mt-3 position-absolute">{{ errorMsg }}</p>
            </div>
            <MapComponent
              class="mt-2"
              style="height: 28.125rem; width: 51.875rem"
              @selectedLocation="handleCoordinates"
            ></MapComponent>
          </div>
          <div class="form-group align-self-center mt-2">
            <button
              type="submit"
              class="btn custom-btn float-end mt-2"
              for="form-group-input"
            >
              Create Event
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { eventStore } from '@/store/eventStore.js';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MapComponent from '@/components/Map/MapComponent.vue';
import { getAddressFromCoordinates } from '@/utils/getAddressFromCoordinates';
import { getTimeZone } from '@/utils/getTimeZone';
import moment from 'moment-timezone';
import firebaseData from '@/services/firebaseConfig.js';

const today = new Date().toISOString().slice(0, 10);

const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const currentTime = `${hours}:${minutes}`;

const router = useRouter();

const firebaseStorage = firebaseData.fireStorage.ref();

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const schema = yup.object({
  name: yup.string().required('This field is required!'),
  description: yup.string().required('This field is required!'),
  tickets: yup.number().min(1, 'The count of tickets cannot be negative!').max(30000, 'The count of tickets cannot be higher than 30000!').required('This field is required!'),
  price: yup.number().min(1, 'The price of ticket cannot be negative!').max(1000, 'The price of ticket cannot be higherthan 1000$!').required('This field is required!'),
  budget: yup.number().min(0, 'The budget cannot be negative!').required('This field is required!'),
  date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(yesterday, 'You can not select date, which is in the past!')
    .required('This field is required!'),
  time: yup.string().required('This field is required!'),
});

const store = eventStore();

const errorMsg = ref('');
const errorMsgImage = ref('');

const selectedCoordinates = ref(null);
const address = ref(null);
const timeZone = ref(null);
const time = ref(null);
const imageUrl = ref(null);
const eventName = ref('');

const handleCoordinates = async (coordinates) => {
  selectedCoordinates.value = coordinates;
};

const handleFileUpload = async (event) => {
  const imageFile = event.target.files[0];
  const storageRef = firebaseStorage.child(`images/${imageFile.name}`);
  try {
    const snapshot = await storageRef.put(imageFile);
    imageUrl.value = await snapshot.ref.getDownloadURL();
    console.log('Successfully upload!');
  } catch (error) {
    console.log(error);
  }
};

const handleCreateEvent = async (values) => {
  if (!selectedCoordinates.value) {
    errorMsg.value = 'Please select a location on the map!';
    return;
  }

  if (!imageUrl.value) {
    errorMsgImage.value = 'Please select a image!';
    return;
  }

  address.value = await getAddressFromCoordinates(selectedCoordinates.value);
  timeZone.value = getTimeZone(selectedCoordinates.value);
  const eventDateAndTime = `${values.date}T${values.time}`;
  time.value = moment.tz(eventDateAndTime, timeZone.value).utc().toISOString();

  console.log(time.value);

  try {
    const newEvent = {
      name: values.name,
      description: values.description,
      ticket: values.tickets,
      price: values.price,
      budget: values.budget,
      time: time.value,
      location: selectedCoordinates.value,
      address: address.value,
      timeZone: timeZone.value,
      imageUrl: imageUrl.value,
      clients: [],
      profit: 0,
      expenses: 0,
    };

    store.createEvent(newEvent);
    router.push({ name: 'events' });
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<style scoped lang="scss">
.custom-card {
  background-color: $lighter-gray;

  .custom-card-header {
    background-color: $dark-gray;
    color: $classic-cream;
  }

  .custom-btn {
    background-color: $elegant-gold;
    color: $classic-cream;
    border: none;
  }

  .custom-form-control-label {
    color: $classic-cream;
  }
}
</style>
